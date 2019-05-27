class CreateUploadedFiles < ActiveRecord::Migration[5.2]
  def change
    create_table :uploaded_files do |t|
      t.integer :task_id
      t.string :file

      t.timestamps
    end
  end
end
