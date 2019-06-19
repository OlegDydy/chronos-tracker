# frozen_string_literal: true

class Column < ApplicationRecord
  belongs_to :project, class_name: 'Project', foreign_key: 'project_id'
  has_many :tasks, class_name: 'Task', foreign_key: 'column_id', dependent: :nullify

  before_destroy :archive_tasks

  def reorder(new_position)
    return if new_position == position || new_position.nil?

    transaction do
      edge = position

      update(position: -1)
      if new_position > edge
        Column
          .where(project_id: project_id, position: edge..new_position)
          .update_all('"position" = "position" - 1')
      else
        Column
          .where(project_id: project_id, position: new_position..edge)
          .update_all('"position" = "position" + 1')
      end
      update(position: new_position)
    end
  end

  def archive_tasks
    edge = position
    update(position: -1)
    Column
      .where(project_id: project_id, position: edge..Float::INFINITY)
      .update_all('"position" = "position" - 1')

    tasks.update_all(column_id: nil, position: 0)
  end

  def renderJSON
    {
      id: self.id,
      position: self.position,
      column: {
        projectId: project_id,
        name: self.name,
        tasks: self.tasks.order(:position).map(&:id)
      }
    }
  end
end
