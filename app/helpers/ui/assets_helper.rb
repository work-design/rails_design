# frozen_string_literal: true
module Ui
  module AssetsHelper

    # Assets path: app/assets/javascripts/controllers
    def pack_path(ext:,**options)
      path, ext = assets_load_path(exts: ext, suffix: options.delete(:suffix))

      asset_pack_path(path + ext)
    end

    def js_load(**options)
      exts = ['.js'] + Array(options.delete(:ext))
      path, _ = assets_load_path(exts: exts, suffix: options.delete(:suffix))

      if path
        javascript_pack_tag(path, **options).html_safe
      end
    end

    # Assets path: app/assets/stylesheets/controllers
    def css_load(**options)
      exts = ['.css'] + Array(options.delete(:ext))
      path, _ = assets_load_path(exts: exts, suffix: options.delete(:suffix))

      if path
        stylesheet_pack_tag(path, **options).html_safe
      end
    end

    private
    def assets_load_path(exts: [], suffix: nil)
      exts.uniq!
      filename = "#{controller_path}/#{@_rendered_template}"
      filename = [filename, '-', suffix].join if suffix

      exts.each do |ext|
        if Viter.manifest.lookup_by(@_rendered_template_path, type: ext)
          return [filename, ext]
        end
      end

      []
    end

  end
end
