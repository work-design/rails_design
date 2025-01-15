module RailsDesign
  class Engine < ::Rails::Engine

    initializer 'rails_design.assets' do |app|
      app.config.assets.paths << root.join('app/assets/images')
    end

  end
end
