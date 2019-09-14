Rails.application.routes.draw do
  # get 'posts/new'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'posts#index'
  resources :posts do
    resources :comments, only: [:create, :destroy]
  end
  resources :users
  resources :sessions do
    delete :destroy, on: :collection
  end
end
