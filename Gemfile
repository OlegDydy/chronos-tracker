# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.2'

gem 'activeadmin', '~> 2.0'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'coffee-rails', '~> 4.2'
gem 'devise', '~> 4.6', '>= 4.6.2'
gem 'dotenv', '~> 2.7'
gem 'dotenv-rails', '~> 2.7'
gem 'duktape'
gem 'jbuilder', '~> 2.5'
gem 'mini_magick', '~> 4.8'
gem 'pg', '~> 1.1'
gem 'puma', '~> 3.11'
gem 'rails', '~> 5.2.3'
gem 'react-rails', '~> 2.5'
gem 'sassc-rails', '~> 2.1', '>= 2.1.1'
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', '~> 4.0', '>= 4.0.2'

group :development, :test do
  # Use Capistrano for deployment
  # gem 'capistrano-rails', group: :development
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'chromedriver-helper'
  gem 'selenium-webdriver'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
