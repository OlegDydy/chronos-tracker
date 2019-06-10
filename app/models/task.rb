# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :column, class_name: 'Column', foreign_key: 'column_id'
  has_many :tracks, class_name: 'Track', foreign_key: 'task_id'

  def marks
    result = []
    mask = 1
    for i in (0..32) do # rubocop:disable Style/For
      result.append(i) if mark & mask != 0
      mask <<= 1
    end
    result
  end
end
