class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.integer :user_id
      t.integer :task_id
      t.timestamp :begin
      t.timestamp :end

      t.timestamps
    end
  end
end
