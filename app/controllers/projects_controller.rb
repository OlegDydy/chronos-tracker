# frozen_string_literal: true

class ProjectsController < ApplicationController
  before_action :authenticate_user!

  # list of all avaliable projects
  def index; end

  # one specified project
  def show; end

  # change specified project
  def edit; end

  # create new project
  def new; end
end
