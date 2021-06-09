module Ui
  class CommonController < ActionController::Base

    def index
      path = Pathname.new "/#{params['path']}.#{request.format.symbol}"
      if path.exist? && Rails.env.development?
        send_file path
      else
        header :ok
      end
    end

  end
end
