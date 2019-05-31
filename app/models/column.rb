class Column < ApplicationRecord
  belongs_to :project, class_name: "Project", foreign_key: "project_id"
  has_many :tasks, class_name: "Task", foreign_key: "reference_id"
end
