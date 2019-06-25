# frozen_string_literal: true

class TracksController < ApplicationController
  before_action :authenticate_user!

  def create
    permitted = params.require(:track).permit(:id, :task)
    permitted.worker_id = current_user.id

    # @type [Track]
    track = Track.find(permitted[:id]) || Track.new(permitted)

    if track.new_record?
      track.save!
    end

    # disable all active
    ActivityPeriod
      .joins(track: [ :worker ])
      .where(tracks: { worker_id: current_user.id }, end: nil)
      .update_all(end: DateTime.now)

    activity = activity_periods.create begin: DateTime.now.utc

    if track.save
      render json: {
        status: :ok,
        track: {
          id: track.id,
          name: track.task.name,
          begin: activity.begin
        }
      }
    else
      render json: { status: :error, message: track.errors }, status: :unpocessable_entity
    end
  end

  def destroy
    permitted = params.require(:track).permit(:id)
    track = Track.find(permitted[:id])

    track.activity_periods.where(end: nil).update_all(end: DateTime.now.utc) if track.present?

    if track.save
      render json: { status: :ok }
    else
      render json: { status: :error, message: track.errors }, status: :unpocessable_entity
    end
  end
end
