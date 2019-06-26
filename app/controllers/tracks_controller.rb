# frozen_string_literal: true

class TracksController < ApplicationController
  before_action :authenticate_user!

  def create
    permitted = params.require(:track).permit(:task_id)
    permitted[:worker_id] = current_user.id

    # @type [Track]
    track = Track.where(task_id: permitted[:task_id]).first || Track.new(permitted)

    track.save! if track.new_record?

    # disable all active
    ActivityPeriod
      .joins(track: [:worker])
      .where(tracks: { worker_id: current_user.id }, end: nil)
      .update_all(end: DateTime.now.utc)

    activity = track.activity_periods.create begin: DateTime.now.utc

    if track.save
      render json: {
        status: :ok,
        track: {
          id: track.id,
          name: track.task.name,
          begin: activity.begin,
          taskId: track.task_id
        }
      }
    else
      render json: { status: :error, message: track.errors }, status: :unpocessable_entity
    end
  end

  def destroy
    permitted = params.permit(:id)
    track = Track.find(permitted[:id])

    track.activity_periods.where(end: nil).update_all(end: DateTime.now.utc) if track.present?

    if track.save
      render json: { status: :ok }
    else
      render json: { status: :error, message: track.errors }, status: :unpocessable_entity
    end
  end
end
