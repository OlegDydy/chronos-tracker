class CreateTasks < ActiveRecord::Migration[5.2]

  def up 
    execute <<-SQL
      CREATE TABLE tasks(
        "id" serial PRIMARY KEY,
        "column_id" INTEGER,
        "project_id" INTEGER NOT NULL,
        "position" INTEGER NOT NULL,
        "name" VARCHAR,
        "description" TEXT,
        "new_description" TEXT,
        "mark" INTEGER,
        "deadline" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP NOT NULL,
        CONSTRAINT position_in_column UNIQUE ("position", "column_id") DEFERRABLE
      );
    SQL
    add_index :tasks, :project_id
    add_index :tasks, :name
    add_index :tasks, :deadline
  end

  def down 
    drop_table :tasks
  end
end
