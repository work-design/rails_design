module RailsUi
  class Engine < ::Rails::Engine

    config.after_initialize do |app|
      if RailsUi.config.custom_viter
        RailsUi::Exporter.export
      end
    end

  end
end
