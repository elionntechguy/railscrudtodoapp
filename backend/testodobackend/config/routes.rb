Rails.application.routes.draw do
  resources :todos

  root to: 'todos#index'
  match '/request' => 'todos#create', via: :post
  match '/request' => 'todos#create', via: :get
  get '/request/:id/edit', to: 'todos#edit'
  patch '/request/:id', to: 'todos#update'
  delete '/request/:id(.:format)', :to => 'todos#destroy'
end
