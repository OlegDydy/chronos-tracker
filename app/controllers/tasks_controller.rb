# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :authenticate_user!

  def index; end

  def show; end

  def update
    permitted = permit_params
    unless permitted[:id]
      render json: { status: :error, message: I18n.t('error.id_required') }
      return
    end

    task = Task.find(permitted[:id])

    begin
      if permitted[:column_id].present?
        task.move_to_column permitted[:column_id], permitted[:position]
        permitted.delete :position
        permitted.delete :column_id
      end
    rescue ReorderError => e
      render json: { status: :error, message: e.message }
      return
    end

    if permitted[:position].present?
      task.reorder permitted[:position]
      permitted.delete :position
    end

    if task.update(permitted)
      render json: { status: :ok, data: render_task(task) }
    else
      render json: { status: :error, message: task.errors }, status: :unpocessable_entity
    end
  end

  def archive
    permitted = params.permit(:id)
    unless permitted[:id].present?
      render json: { status: :error, message: I18n.t('error.id_required') }
      return
    end

    # test is user can archive this task i.e. task in project that user can change

    Task.find(permitted[:id]).archive
    render json: { status: :ok }
  end

  # create new task
  def create
    permitted = params.require(:task).permit(:name, :project_id, :column_id, :description, mark: [])
    project = Project.find(permitted[:project_id])
    return unless protect_project(project)

    column = Column.find(permitted[:column_id])
    return unless protect_column(column, project)

    permitted[:position] = column.tasks.count
    permitted[:mark] = compact_markers(permitted[:mark])
    task = Task.new permitted
    if task.save
      render json: { status: :ok, data: render_task(task) }
    else
      render json: task.errors, status: :unpocessable_entity
    end
  end

  def render_task(task)
    {
      id: task.id,
      position: task.position,
      task: {
        columnId: task.column_id,
        projectId: task.project_id,
        name: task.name,
        description: task.description,
        marks: task.marks
      }
    }
  end

  private

  def compact_markers(markers)
    result = 0
    markers.each do |mark|
      result |= 1 << mark
    end
    result
  end

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
    params.permit(
      :id, :description, :position, :name,
      :deadline, :column_id, mark: []
    )
  end
end
