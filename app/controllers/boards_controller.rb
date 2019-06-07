class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = user
    @boards = boards
  end

  def show
    @boardId = params[:id].to_i
    @user = user
    @boards = boards
  end

  def boards
    projects = []
    if current_user.instance_of?(Worker)
      projects = current_user.projects
    else
      projects = current_user.my_projects
    end
    projects.map do |project|
      {
        id: project.id,
        name: project.name,
        owner: project.owner_id,
        columns: project.columns.map do |column|
          {
            id: column.id,
            name: column.name,
            tasks: column.tasks.map {|task| {id: task.id, name: task.name, marks: task.marks} }
          }
        end
      }
    end
    # [
    #   {
    #     id: 1,
    #     name: 'Self-Education',
    #     owner: user,
    #     columns: [
    #       {
    #         id: 1,
    #         name: 'TODO',
    #         tasks: [
    #           {
    #             id: 1,
    #             name: 'Some Cool Feature',
    #             marks: [ 1, 2 ],
    #             description: 'I haven\'t figured it out yet'
    #           }
    #         ]
    #       }
    #     ]
    #   }
    # ]
  end

  def user
    {
    id: current_user.id,
    name: current_user.name,
    email: current_user.email
  }
  end
end
