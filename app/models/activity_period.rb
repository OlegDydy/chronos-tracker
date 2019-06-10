# frozen_string_literal: true

class ActivityPeriod < ApplicationRecord
  belongs_to :track, class_name: 'Track', foreign_key: 'track_id'
end
