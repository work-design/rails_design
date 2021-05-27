import { Controller } from 'stimulus'

// 商品橱窗展示，
// 点击小图显示对应图片
// 点击切换箭头，显示上一张或者下一张图片
class ShowcaseController extends Controller {

  connect() {
    console.debug(this.identifier, 'connected!')
  }

  // data-action="hover->showcase#show"
  show(event) {


  }

}

application.register('showcase', ShowcaseController)
