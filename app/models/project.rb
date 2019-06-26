# frozen_string_literal: true

class Project < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :columns, class_name: 'Column', foreign_key: 'project_id'
  has_many :tasks, through: :columns
  has_and_belongs_to_many :workers, join_table: 'projects_workers'

  def owned_by?(user)
    user.id == owner_id
  end

  def statistics
    @stats = {
      perMonth: {
        tasks: Task.where(project_id: id, created_at: DateTime.now.utc - 1.month..DateTime.now.utc).count,
        completed: Task
          .where(project_id: id, column_id: nil, updated_at: DateTime.now.utc - 1.month..DateTime.now.utc)
          .count,
        workers: Track
          .select('worker_id')
          .joins(:task)
          .where(tasks: { project_id: id, updated_at: DateTime.now.utc - 1.month..DateTime.now.utc })
          .distinct.count,
        time: Track
          .select('SUM("activity_periods"."end" - "activity_periods"."begin") as "duration"')
          .joins(:task, :activity_periods)
          .where(tasks: { project_id: id, updated_at: DateTime.now.utc - 1.month..DateTime.now.utc })[0][:duration],
        average: 0
      },
      allTime: {
        tasks: Task.where(project_id: id).count,
        completed:
          Task
            .where(project_id: id, column_id: nil)
            .count,
        workers:
          Track
            .select('worker_id')
            .joins(:task)
            .where(tasks: { project_id: id })
            .distinct.count,
        time:
          Track
            .select('SUM("activity_periods"."end" - "activity_periods"."begin") as "duration"')
            .joins(:task, :activity_periods)
            .where(tasks: { project_id: id })[0][:duration],
        average: 0
      }
    }

    # @stats[:perMonth][:average] = @stats[:perMonth][:time] / @stats[:perMonth][:completed]
    # @stats[:allTime][:average] = @stats[:allTime][:time] / @stats[:allTime][:completed]
    @stats
  end
end
