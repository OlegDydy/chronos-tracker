# frozen_string_literal: true

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
  resources :projects
  get '/', to: 'boards#index', as: :default
  get '/boards', to: 'boards#index', as: :user_root
  post '/tasks/:id/archive', to: 'tasks#archive'
end
