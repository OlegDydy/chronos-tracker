# frozen_string_literal: true

class Task < ApplicationRecord
  has_one :column, class_name: "column", dependent: :nullify
  belongs_to :project, class_name: 'Project', foreign_key: 'project_id'
  has_many :tracks, class_name: 'Track', foreign_key: 'task_id'

  def archive
    col = column_id
    edge = position
    update(column_id: nil, position: 0)
    Task
      .where(column_id: col, position: edge..Float::INFINITY)
      .update_all('"position" = "position" - 1')
  end

  def marks
    result = []
    mask = 1
    for i in (0...32) do # rubocop:disable Style/For
      result.append(i) if mark & mask != 0
      mask <<= 1
    end
    result
  end

  def reorder(new_position)
    return if new_position == position || new_position.nil?

    transaction do
      edge = position
      update(position: -1)
      if new_position > edge
        Task
          .where(column_id: column_id, position: edge..new_position)
          .update_all('"position" = "position" - 1')
      else
        Task
          .where(column_id: column_id, position: new_position..edge)
          .update_all('"position" = "position" + 1')
      end
      update(position: new_position)
    end
  end

  def move_to_column(new_column, new_position)
    raise ReorderError, I18n.t('error.no_column', id: new_column) if Column.exists?(new_column)

    if new_column == column_id
      reorder(new_position)
      return
    end
    transaction do
      edge = position
      update(position: -1)
      Task
        .where(column_id: column_id, position: edge..Float::INFINITY)
        .update_all('"position" = "position" - 1')
      if new_position.nil?
        new_position = Task.where(column_id: new_column).count
      else
        Task
          .where(column_id: new_column, position: new_position..Float::INFINITY)
          .update_all('"position" = "position" + 1')
      end
      update(position: new_position, column_id: new_column)
    end
  end
end
