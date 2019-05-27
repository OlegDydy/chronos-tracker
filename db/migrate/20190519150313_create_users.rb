class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :login
      t.string :email

      t.timestamps
    end
    add_index :users, :login
    add_index :users, :email
  end
end
