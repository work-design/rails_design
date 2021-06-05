module RailsUi
  class Engine < ::Rails::Engine

    config.after_initialize do |app|
      if RailsUi.config.custom_webpacker
        Webpacker::Helper.export
      end
    end

  end
end
