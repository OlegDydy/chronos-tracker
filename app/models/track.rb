# frozen_string_literal: true

class Track < ApplicationRecord
  belongs_to :worker, class_name: 'Worker', foreign_key: 'worker_id'
  belongs_to :task, class_name: 'Task', foreign_key: 'task_id'
  has_many :activity_periods, class_name: 'ActivityPeriod', foreign_key: 'track_id'
end
