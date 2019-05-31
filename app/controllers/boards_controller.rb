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
    [
      {
        id: 1,
        name: 'Self-Education',
        owner: user,
        columns: [
          {
            id: 1,
            name: 'TODO',
            tasks: [
              {
                id: 1,
                name: 'Some Cool Feature',
                marks: [ 1, 2 ],
                description: 'I haven\'t figured it out yet'
              }
            ]
          }
        ]
      }
    ]
  end

  def user
    {
    id: current_user.id,
    name: current_user.name,
    email: current_user.email
  }
  end
end
