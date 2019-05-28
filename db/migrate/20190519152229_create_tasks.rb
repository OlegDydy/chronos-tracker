class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.integer :project_id
      t.string :name
      t.text :description
      t.text :new_description
      t.integer :state
      t.integer :mark
      t.date :deadline

      t.timestamps
    end
  end
end
