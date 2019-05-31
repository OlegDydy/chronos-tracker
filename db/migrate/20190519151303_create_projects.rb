class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.integer :owner_id
      t.string :name
      t.string :description
      t.string :workflow

      t.timestamps
    end
    add_index :projects, :owner_id
    add_index :projects, :name
  end
end
