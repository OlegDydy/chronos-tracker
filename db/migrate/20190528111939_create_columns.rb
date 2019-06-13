class CreateColumns < ActiveRecord::Migration[5.2]
  def change
    create_table :columns do |t|
      t.integer :project_id
      t.string :name
      t.integer :position

      t.timestamps
    end
    add_index :columns, :name
    add_index :columns, [:project_id, :position], :unique => true
  end
end
