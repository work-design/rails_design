# ignore config/webpacker.yml in git
# gem 'webpacker', require: File.exist?('config/webpacker.yml')
# config.webpacker.xxx = xx if config.respond_to?(:webpacker)
module Webpacker
  class YamlHelper
    
    # uses config/webpacker_template.yml in rails_com engine as default,
    # config/webpacker_template.yml in Rails project will override this.
    def initialize(template: 'config/webpacker_template.yml', export: 'config/webpacker.yml')
      template_path = (Rails.root + template).existence || RailsCom::Engine.root + template
      export_path = Rails.root + export
      
      @yaml = YAML.parse_stream File.read(template_path)
      @content = @yaml.children[0].children[0].children
      @parsed = @yaml.to_ruby[0]
      @io = File.new(export_path, 'w+')
    end
    
    def dump
      @yaml.yaml @io
      @io.fsync
      @io.close
    end
    
    def append(env = 'default', key, value)
      return if Array(@parsed.dig(env, key)).include? value
      env_index = @content.find_index { |i| i.is_a?(Psych::Nodes::Scalar) && i.value == env }
      env_content = @content[env_index + 1].children
      value_index = env_content.find_index { |i| i.is_a?(Psych::Nodes::Scalar) && i.value == key }
      value_content = env_content[value_index + 1]
      
      if value_content.is_a?(Psych::Nodes::Sequence)
        value_content.style = 1  # block style
        value_content.children << Psych::Nodes::Scalar.new(value)
      end

      value_content
    end
    
  end
end
