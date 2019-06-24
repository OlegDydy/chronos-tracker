# frozen_string_literal: true

class TracksController < ApplicationController
  before_action :authenticate_user!

  def create
    permitted = params.require(:track).permit(:id, :task)
    permitted.worker_id = current_user.id
    
    # @type [Track]
    track = Track.find(permitted[:id]) || Track.new(permitted)

    if track.new_record? do
      track.save!
    end

    activity = ActivityPeriod.new track_id: track.id, begin: DateTime.now
    
    if track.save
      render json: {
        status: :ok,
        track: {
          id: track.id,
          name: track.task.name
        }
      }
    else
      render json: { status: :error, message: track.errors }
    end
  end
end
