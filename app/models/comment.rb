class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
  belongs_to :task, class_name: "Task", foreign_key: "task_id"

end
