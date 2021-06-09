Rails.application.routes.draw do
  get '@fs/*path' => 'ui/common#index'
end
