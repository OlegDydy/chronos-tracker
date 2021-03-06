# frozen_string_literal: true

class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = user
    project_list = current_user.instance_of?(Worker) ? current_user.projects : current_user.my_projects
    @projects = projects(project_list)
    @columns = columns(project_list)
    @tasks = tasks(project_list)
  end

  def show
    @board_id = params[:id].to_i
    @user = user
    project_list = current_user.instance_of?(Worker) ? current_user.projects : current_user.my_projects
    @projects = projects(project_list)
    @columns = columns(project_list)
    @tasks = tasks(project_list)
  end

  private

  def projects(projects_list)
    projects_list.each_with_object({}) do |project, result|
      result[project.id] = {
        name: project.name,
        owner: project.owner_id,
        columns: project.columns.order(:position).map(&:id),
        isCustom: project.owner.type == Customer.name,
        statistics: project.statistics
      }
    end
  end

  def columns(projects)
    Column.where(project_id: projects.ids).each_with_object({}) do |column, result|
      result[column.id] = {
        projectId: column.project_id,
        name: column.name,
        tasks: column.tasks.order(:position).map(&:id)
      }
    end
  end

  def tasks(projects)
    Task.where(project_id: projects.ids).each_with_object({}) do |task, result|
      result[task.id] = {
        columnId: task.column_id,
        projectId: task.project_id,
        name: task.name,
        description: task.description,
        marks: task.marks
      }
    end
  end

  def user
    track = ActivityPeriod.joins(track: [:worker])
                          .where(tracks: { worker_id: current_user.id }, end: nil)
                          .first
    track_json = nil
    if track
      track_json = {
        id: track.track_id,
        begin: track.begin,
        name: track.track.task.name,
        taskId: track.track.task_id
      }
    end
    {
      id: current_user.id,
      name: current_user.name,
      email: current_user.email,
      type: current_user.class.name,
      track: track_json
    }
  end
end
