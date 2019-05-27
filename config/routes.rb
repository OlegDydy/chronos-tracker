Rails.application.routes.draw do
  resources :comments
  resources :uploaded_files
  resources :tracks
  resources :tasks
  resources :projects
  resources :positions
  resources :workers
  resources :customers
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
