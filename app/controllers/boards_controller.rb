# frozen_string_literal: true

class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = user
    boards
  end

  def show
    @board_id = params[:id].to_i
    @user = user
    projects = current_user.instance_of?(Worker) ? current_user.projects : current_user.my_projects
    @boards = boards(projects)
    @columns = columns(projects)
    @tasks = tasks(projects)
  end

  def boards(projects)
    projects.map do |project|
      {
        id: project.id,
        name: project.name,
        owner: project.owner_id,
        columns: project.column_ids
      }
    end
  end

  def columns(projects)
    projects.select('"columns".*').join(:column).inject({}) do |result, column|
      result[column.id] = {
        name: column.name,
        tasks: column.task_ids
      }
    end
  end

  def tasks(projects)
    projects.select('"tasks".*').join(:tasks).inject({}) do |result, task|
      result[id: task.id] = {
        name: task.name,
        marks: task.marks
      }
    end
  end

  def user
    {
      id: current_user.id,
      name: current_user.name,
      email: current_user.email
    }
  end
end
