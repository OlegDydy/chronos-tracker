# frozen_string_literal: true

class ReorderError < StandardError
  def initialize(msg = 'Reordering error')
    super
  end
end
