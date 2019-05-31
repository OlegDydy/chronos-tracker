class Task < ApplicationRecord
  belongs_to :column, class_name: "Column", foreign_key: "column_id"
  has_many :tracks, class_name: "Track", foreign_key: "task_id"
end
