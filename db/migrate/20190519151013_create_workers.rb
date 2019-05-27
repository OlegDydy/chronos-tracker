class CreateWorkers < ActiveRecord::Migration[5.2]
  def change
    create_table :workers do |t|
      t.integer :user_id
      t.integer :qualification
      t.integer :position
      t.boolean :halftime
      
      t.timestamps
    end
    add_index :workers, :user_id
    add_index :workers, :qualification
    add_index :workers, :position
  end
end
