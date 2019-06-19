class CreateColumns < ActiveRecord::Migration[5.2]
  def up 
    execute <<-SQL
      CREATE TABLE tasks(
        "id" serial PRIMARY KEY,
        "project_id" INTEGER,
        "name" VARCHAR,
        "position" INTEGER NOT NULL,
        "created_at" TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP NOT NULL,
        CONSTRAINT position_in_project UNIQUE ("position", "project_id") DEFERRABLE
      );
    SQL
    add_index :columns, :name
    add_index :columns, :project_id
  end

  def down 
    drop_table :columns
  end
end
