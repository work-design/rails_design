module Webpacker
  module Helper
    extend self

    def export
      webpack = YamlHelper.new(template: 'config/webpacker_template.yml', export: 'config/webpacker.yml')
      vite = YamlHelper.new(template: 'config/viter_template.yml', export: 'config/viter.yml')
      Rails::Engine.subclasses.each do |engine|
        java_root = engine.root.join('app/packs')
        if java_root.directory?
          java_root.children.select(&:directory?).each do |path|
            webpack.append 'additional_paths', path.to_s
          end
          vite.add 'alias', { "#{engine.engine_name}_pack" => java_root.to_s }
        end

        asset_root = engine.root.join('app/assets')
        if asset_root.directory?
          asset_root.children.select(&:directory?).each do |path|
            webpack.append 'additional_paths', path.to_s
          end
          vite.add 'alias', { "#{engine.engine_name}_ui" => asset_root.to_s }
        end

        view_root = engine.root.join('app/views')
        if view_root.directory?
          webpack.append 'additional_paths', view_root.to_s
          webpack.append 'engine_paths', view_root.to_s
          vite.add 'alias', { "#{engine.engine_name}_view" => view_root.to_s }
        end
      end
      vite.dump
      webpack.dump
    end

  end
end
