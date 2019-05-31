Rails.application.routes.draw do
  resources :activity_periods
  resources :columns
  devise_for :users
  resources :comments
  resources :uploaded_files
  resources :tracks
  resources :tasks
  resources :projects
  resources :positions
  resources :workers
  resources :customers
  resources :boards
  get '/boards', to: 'boards/#index', as: :user_root
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
