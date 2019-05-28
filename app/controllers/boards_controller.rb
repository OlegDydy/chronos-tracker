class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @board = {
      name: 'Self-Education',
      owner: {
        id: current_user.id,
        name: current_user.name,
        email: current_user.email
      },
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
  end
end
