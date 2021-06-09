# frozen_string_literal: true
module Ui
  module AssetsHelper

    # Assets path: app/assets/javascripts/controllers
    def pack_path(ext:, **options)
      path, ext = assets_load_path(ext: ext, suffix: options.delete(:suffix))

      asset_vite_path(path + ext)
    end

    def js_load(ext: '.js', **options)
      path, _ = assets_load_path(ext: ext, suffix: options.delete(:suffix))

      if path
        javascript_vite_tag(path, **options).html_safe
      end
    end

    # Assets path: app/assets/stylesheets/controllers
    def css_load(ext: '.css', **options)
      path, _ = assets_load_path(ext: ext, suffix: options.delete(:suffix))

      if path
        stylesheet_vite_tag(path, **options).html_safe
      end
    end

    private
    def assets_load_path(ext: '.js', suffix: nil)
      filename = "#{controller_path}/#{@_rendered_template}"
      filename = [filename, '-', suffix].join if suffix

      pathname = Pathname.new(@_rendered_template_path)
      js_name = pathname.without_extname.sub_ext ext

      if Viter.manifest.lookup_by_path(js_name)
        return [js_name.to_s, ext]
      end

      []
    end

  end
end
