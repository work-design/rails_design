module RailsUi
  module Exporter
    extend self

    def export
      vite = YamlHelper.new(template: 'config/viter_template.yml', export: 'config/viter.yml')

      Rails::Engine.subclasses.each do |engine|
        asset_root = engine.root.join('app/assets', 'entrypoints')
        if asset_root.directory?
          vite.add 'alias', { "#{engine.engine_name}_ui" => asset_root.to_s }
        end

        view_root = engine.root.join('app/views')
        if view_root.directory?
          vite.add 'alias', { "#{engine.engine_name}_view" => view_root.to_s }
        end
      end

      vite.dump
    end

  end
end
