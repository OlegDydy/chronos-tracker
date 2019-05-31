class Project < ApplicationRecord
  belongs_to :owner, class_name: "User", foreign_key: "owner_id"
  has_many :columns, class_name: "Column", foreign_key: "project_id"
  has_many :tasks, through: :columns
  scope :personal, -> { joins(owner_id: usr).where(users: { type: 'Worker' })}
  
end
