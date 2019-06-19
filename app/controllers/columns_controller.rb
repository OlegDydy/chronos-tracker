# frozen_string_literal: true

class ColumnsController < ApplicationController
  before_action :authenticate_user!

  def create
    permitted = params.require(:column).permit(:name, :project_id, :position)

    # @type [Project]
    project = Project.find(permitted[:project_id])
    # @todo: write protection
    # @todo: write position insert
    # if .owner != current_user

    permitted[:position] = project.columns.count unless permitted[:position].present?
    @column = Column.new(permitted)
    if @column.save
      render json: {
        status: :ok,
        data: @column.renderJSON
      }
    else
      render json: { status: :error, message: @column.errors}, status: :unpocessable_entity
    end
  end

  def destroy
    # @type [Column]
    @column = Column.find(params[:id])

    if @column.destroy
      render json: { status: :ok }
    else
      render json: { status: :error, message: @column.errors }, status: :unpocessable_entity
    end
  end
  
  def update
    permitted = permit_params;
    @column = Column.find(permitted[:id])

    if permitted[:position]
      permitted.delete :position
    end

    if @column.update(permit_params)
      flash[:success] = "Column was successfully updated"
      redirect_to @column
    else
      flash[:error] = "Something went wrong"
      render 'edit'
    end
  end
  
  private
  
  def permit_params
    params.permit(
      :id, :name, :position
    )
  end

end
