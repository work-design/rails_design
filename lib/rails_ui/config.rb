# frozen_string_literal: true

require 'active_support/configurable'

module RailsUi #:nodoc:
  include ActiveSupport::Configurable

  configure do |config|
    config.custom_webpacker = true
  end

end
