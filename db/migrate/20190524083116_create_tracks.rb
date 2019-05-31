class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.integer :worker_id
      t.integer :task_id
      
      t.timestamps
    end
    add_index :tracks, :worker_id
    add_index :tracks, :track_id
  end
end
