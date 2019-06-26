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

  def global_statistics
    projects = current_user.my_projects
    projects = current_user.projects if current_user.instance_of?(Worker)
    @stats = {
      perMonth: {
        tasks: projects.sum { |p| Task.where(project_id: p.id, created_at: DateTime.now.utc - 1.month..DateTime.now.utc).count },
        completed: projects.sum do |p|
          Task
            .where(project_id: p.id, column_id: nil, updated_at: DateTime.now.utc - 1.month..DateTime.now.utc)
            .count
        end,
        workers: p.sum do |p|
          Track
            .select('worker_id')
            .joins(:task)
            .where(tasks: { project_id: p.id, updated_at: DateTime.now.utc - 1.month..DateTime.now.utc })
            .distinct.count
        end,
        time: p.sum do |p|
          Track
            .select('SUM("activity_periods"."end" - "activity_periods"."begin") as "duration"')
            .joins(:task, :activity_periods)
            .where(tasks: { project_id: p.id, updated_at: DateTime.now.utc - 1.month..DateTime.now.utc })[0][:duration]
        end,
        average: 0
      },
      allTime: {
        tasks: projects.sum { |p| Task.where(project_id: p.id).count },
        completed: projects.sum do |p|
          Task
            .where(project_id: p.id, column_id: nil)
            .count
        end,
        workers: p.sum do |p|
          Track
            .select('worker_id')
            .joins(:task)
            .where(tasks: { project_id: p.id })
            .distinct.count
        end,
        time: p.sum do |p|
          Track
            .select('SUM("activity_periods"."end" - "activity_periods"."begin") as "duration"')
            .joins(:task, :activity_periods)
            .where(tasks: { project_id: p.id })[0][:duration]
        end,
        average: 0
      }
    }

    # @stats[:perMonth][:average] = @stats[:perMonth][:time] / @stats[:perMonth][:completed]
    # @stats[:allTime][:average] = @stats[:allTime][:time] / @stats[:allTime][:completed]

    render json: { status: :ok, statistics: @stats }
  end
end
