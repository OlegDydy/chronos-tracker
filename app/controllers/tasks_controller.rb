# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :authenticate_user!

  # list of all avaliable projects
  def index; end

  # one specified project
  def show; end

  # change specified project
  def edit
    permitted = permit_params
    if permitted[:position].present?
      Task.update_all('"position" = "position" + 1',
                      column_id: column_id, position: permitted[:position]..Float::INFINITY)
    end
    task = Task.find(permitted[:id])
    if task.update(id, permitted)
      render json: { status: :ok }
    else
      render json: task.errors, status: :unpocessable_entity
    end
  end

  # create new project
  def create
    permitted = params.require(:task).permit(:name, :project_id, :column_id)
    project = Project.find(permitted[:project_id])
    return unless protect_project(project)

    column = Column.find(permitted[:column_id])
    return unless protect_column(column, project)

    permitted[:position] = column.tasks.count
    task = Task.new permitted
    if task.save
      render json: { status: :ok, data: task }
    else
      render json: task.errors, status: :unpocessable_entity
    end
  end

  private

  def protect_project(project)
    if project.nil?
      render json: {
        status: :error,
        error: I18n.t('error.no_project', id: permitted[:project_id])
      }
      return false
    end

    unless project.owned_by? current_user
      render json: {
        status: :error,
        error: I18n.t('error.not_owner')
      }
      return false
    end

    true
  end

  def protect_column(column, project)
    return true if column.present? && column.project_id == project.id

    render json: {
      status: :error,
      error: I18n.t('error.no_column', id: permitted[:column_id])
    }
    false
  end

  def permit_params
    params.require(:id).permit(
      :id, :description, :position, :name,
      :deadline, :mark, :column_id, :project_id
    )
  end
end
