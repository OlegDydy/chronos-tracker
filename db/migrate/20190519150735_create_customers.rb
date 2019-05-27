class CreateCustomers < ActiveRecord::Migration[5.2]
  def change
    create_table :customers do |t|
      t.integer :user_id
      t.string :card
      t.string :telephone
      t.string :about

      t.timestamps
    end
    add_index :customers, :user_id
  end
end
