class CreateProjectsWorkersJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_join_table :projects, :users do |t|
      t.index :project_id
      t.index :worker_id
    end
  end
end
