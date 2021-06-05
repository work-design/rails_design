module Webpacker
  module Helper
    extend self

    def export
      webpack = YamlHelper.new
      json = JsonHelper.new
      Rails::Engine.subclasses.each do |engine|
        java_root = engine.root.join('app/packs')
        java_root.children.select(&:directory?).each do |path|
          webpack.append 'additional_paths', path.to_s
          json.append 'watchAdditionalPaths', path.to_s
        end if java_root.directory?
        asset_root = engine.root.join('app/assets')
        asset_root.children.select(&:directory?).each do |path|
          webpack.append 'additional_paths', path.to_s
          json.append 'watchAdditionalPaths', path.to_s
        end if asset_root.directory?
        view_root = engine.root.join('app/views')
        if view_root.directory?
          webpack.append 'additional_paths', view_root.to_s
          webpack.append 'engine_paths', view_root.to_s
          json.append 'watchAdditionalPaths', view_root.to_s
        end
      end
      json.dump
      webpack.dump
    end

  end
end
