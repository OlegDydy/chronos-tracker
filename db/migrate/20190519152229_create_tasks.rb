class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.integer :column_id, :null => true
      t.integer :project_id, :null => false
      t.integer :position
      t.string :name
      t.text :description
      t.text :new_description
      t.integer :mark
      t.date :deadline

      t.timestamps
    end
    add_index :tasks, [:column_id, :position], :unique => true
    add_index :tasks, :name
    add_index :tasks, :deadline
  end
end
