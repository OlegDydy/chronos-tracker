class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name
      t.integer :customer_id
      t.string :description
      t.string :workflow

      t.timestamps
    end
    add_index :projects, :name
    add_index :projects, :customer_id
  end
end
