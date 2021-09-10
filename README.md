# RailsDesign

[![测试](https://github.com/work-design/rails_design/actions/workflows/test.yml/badge.svg)](https://github.com/work-design/rails_design/actions/workflows/test.yml)
[![Docker构建](https://github.com/work-design/rails_design/actions/workflows/cd.yml/badge.svg)](https://github.com/work-design/rails_design/actions/workflows/cd.yml)
[![Gem](https://github.com/work-design/rails_design/actions/workflows/gempush.yml/badge.svg)](https://github.com/work-design/rails_design/actions/workflows/gempush.yml)

## 约定

* 可以 import：
  * app/assets 下的文件
* entry(rollup input)
  * app/javascripts 下的文件进入

## 开发
* 采用[viter](https://github.com/vitejs/vite)

* 不再支持 [webpacker](https://github.com/rails/webpacker)
* 不再支持 [sprockets](https://github.com/rails/sprockets)
