Rails.application.routes.draw do

  namespace :design, defaults: { business: 'design' } do

    controller :home do
      get :swipe
    end

  end

end
