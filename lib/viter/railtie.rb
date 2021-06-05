require 'rails/railtie'
require 'viter/dev_server_proxy'

class Viter::Engine < ::Rails::Engine
  # Allows Viter config values to be set via Rails env config files
  config.webpacker = ActiveSupport::OrderedOptions.new

  initializer 'webpacker.proxy' do |app|
    insert_middleware = Viter.config.dev_server.present? rescue nil
    if insert_middleware
      app.middleware.insert_before 0, Viter::DevServerProxy, ssl_verify_none: true
    end
  end

  initializer 'webpacker.logger' do
    config.after_initialize do
      if ::Rails.logger.respond_to?(:tagged)
        Viter.logger = ::Rails.logger
      else
        Viter.logger = ActiveSupport::TaggedLogging.new(::Rails.logger)
      end
    end
  end

  initializer 'webpacker.bootstrap' do
    if defined?(Rails::Server) || defined?(Rails::Console)
      Viter.bootstrap
      if defined?(Spring)
        require 'spring/watcher'
        Spring.after_fork { Viter.bootstrap }
        Spring.watch(Viter.config.config_path)
      end
    end
  end

  initializer 'webpacker.set_source' do |app|
    if Viter.config.config_path.exist?
      #app.config.javascript_path = Viter.config.source_path.relative_path_from(Rails.root.join('app')).to_s
    end
  end
end
