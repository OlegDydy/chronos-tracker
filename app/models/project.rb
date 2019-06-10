# frozen_string_literal: true

class Project < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :columns, class_name: 'Column', foreign_key: 'project_id'
  has_many :tasks, through: :columns
  has_and_belongs_to_many :workers, join_table: 'projects_workers'

  def owned_by?(user)
    user.id == owner_id
  end
end
