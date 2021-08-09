module Ui
  class HomeController < BaseController

    def swipe
      @videos = [
        'http://qiniu-xinshengyin.work.design/01.mp4',
        'http://qiniu-xinshengyin.work.design/02.mp4',
        'http://qiniu-xinshengyin.work.design/03.mp4'
      ]
    end

  end
end
