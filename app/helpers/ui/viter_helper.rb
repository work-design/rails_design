# frozen_string_literal: true

# Public: Allows to render HTML tags for scripts and styles processed by Vite.

module Ui
  module ViterHelper

    def image_vite_tag(name, **options)
      image_tag(name, **options)
    end

    # Public: Renders a script tag for vite/client to enable HMR in development.
    def vite_client_tag
      return unless src = vite_manifest.vite_client_src

      tag.script(src: src, type: 'module')
    end

    # Public: Resolves the path for the specified Vite asset.
    #
    # Example:
    #   <%= vite_asset_path 'calendar.css' %> # => "/vite/assets/calendar-1016838bab065ae1e122.css"
    def asset_vite_path(name, **options)
      path_to_asset vite_manifest.path_for(name, **options)
    end

    # Public: Renders a <script> tag for the specified Vite entrypoints.
    def javascript_vite_tag(*names, type: 'module', crossorigin: 'anonymous', **options)
      if Rails.env.development?
        entries = names
      else
        entries = []
        names.map do |name|
          r = helper.path_to_javascript(name)
          r.delete_prefix!('/')
          mani = vite_manifest.find(r)
          mani['file'] if r
        end
      end

      options[:host] = Viter.instance.config.host
      javascript_include_tag(*entries, crossorigin: crossorigin, type: type, **options)
    end

    # Public: Renders a <script> tag for the specified Vite entrypoints.
    def typescript_vite_tag(*names, **options)
      vite_javascript_tag(*names, asset_type: :typescript, **options)
    end

    # Public: Renders a <link> tag for the specified Vite entrypoints.
    def stylesheet_vite_tag(*names, **options)
      #style_paths = names.map { |name| asset_vite_path(name, type: :stylesheet) }
      stylesheet_link_tag(*style_paths, **options) unless Rails.env.development?
    end

    private
    def vite_manifest
      Viter.instance.manifest
    end

    # Internal: Renders a modulepreload link tag.
    def vite_preload_tag(*sources, crossorigin:, **options)
      sources.map { |source|
        href = path_to_asset(source)
        try(:request).try(:send_early_hints, 'Link' => %(<#{ href }>; rel=modulepreload; as=script; crossorigin=#{ crossorigin }))
        tag.link(rel: 'modulepreload', href: href, as: 'script', crossorigin: crossorigin, **options)
      }.join("\n").html_safe
    end

  end
end
