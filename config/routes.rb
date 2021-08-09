Rails.application.routes.draw do

  namespace :ui, defaults: { business: 'ui' } do

    controller :home do
      get :swipe
    end

  end

end
