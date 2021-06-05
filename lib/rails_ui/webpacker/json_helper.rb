# ignore config/webpacker.yml in git
# gem 'webpacker', require: File.exist?('config/webpacker.yml')
# config.webpacker.xxx = xx if config.respond_to?(:webpacker)
module Webpacker
  class JsonHelper

    # uses config/webpacker_template.yml in rails_com engine as default,
    # config/webpacker_template.yml in Rails project will override this.
    def initialize(template: 'config/vite_template.json', export: 'config/vite.json')
      template_path = (Rails.root + template).existence || RailsCom::Engine.root + template
      @export_path = Rails.root + export

      @json = JSON.parse File.read(template_path)
    end

    def dump
      File.open(@export_path, 'w') do |file|
        JSON.dump(@json, file)
      end
    end

    def append(env = 'all', key, value)
      return if Array(@json.dig(env, key.to_s)).include? value
      r = @json.fetch(env, {})
      if r[key].is_a? Array
        r[key].append value
      else
        r[key] = value
      end
      @json[env] = r
    end

  end
end
