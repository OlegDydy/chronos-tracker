class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string  :commentable_type
      t.integer :commentable_id
      t.integer :task_id
      t.text    :text

      t.timestamps
    end
    add_index :comments, :commentable_type
    add_index :comments, :commentable_id
    add_index :comments, :task_id
    add_index :comments, :user_id
    add_index :comments, :admin_id
  end
end
