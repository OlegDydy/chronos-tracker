class CreatePositions < ActiveRecord::Migration[5.2]
  def change
    create_table :positions do |t|
      t.string :name
      t.float :salary, precision: 2
      
      t.timestamps
    end
    add_index :positions, :name
    add_index :positions, :salary
  end
end
