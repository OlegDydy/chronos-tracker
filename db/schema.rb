# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_29_094231) do

  create_table "activity_periods", force: :cascade do |t|
    t.integer "track_id"
    t.datetime "begin"
    t.datetime "end"
  end

  create_table "columns", force: :cascade do |t|
    t.integer "project_id"
    t.string "name"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_columns_on_name"
  end

  create_table "comments", force: :cascade do |t|
    t.string "commentable_type"
    t.integer "commentable_id"
    t.integer "task_id"
    t.text "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commentable_id"], name: "index_comments_on_commentable_id"
    t.index ["commentable_type"], name: "index_comments_on_commentable_type"
    t.index ["task_id"], name: "index_comments_on_task_id"
    t.index [nil], name: "index_comments_on_admin_id"
    t.index [nil], name: "index_comments_on_user_id"
  end

  create_table "positions", force: :cascade do |t|
    t.string "name"
    t.float "salary"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_positions_on_name"
    t.index ["salary"], name: "index_positions_on_salary"
  end

  create_table "projects", force: :cascade do |t|
    t.integer "owner_id"
    t.string "name"
    t.string "description"
    t.string "workflow"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_projects_on_name"
    t.index ["owner_id"], name: "index_projects_on_owner_id"
  end

  create_table "projects_workers", id: false, force: :cascade do |t|
    t.integer "project_id", null: false
    t.integer "worker_id", null: false
    t.index ["project_id"], name: "index_projects_workers_on_project_id"
    t.index ["worker_id"], name: "index_projects_workers_on_worker_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.integer "column_id"
    t.integer "project_id", null: false
    t.integer "position"
    t.string "name"
    t.text "description"
    t.text "new_description"
    t.integer "mark"
    t.date "deadline"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["column_id", "position"], name: "index_tasks_on_column_id_and_position", unique: true
    t.index ["deadline"], name: "index_tasks_on_deadline"
    t.index ["name"], name: "index_tasks_on_name"
    t.index ["project_id", "position"], name: "index_tasks_on_project_id_and_position", unique: true
  end

  create_table "tracks", force: :cascade do |t|
    t.integer "worker_id"
    t.integer "task_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["worker_id"], name: "index_tracks_on_worker_id"
    t.index [nil], name: "index_tracks_on_track_id"
  end

  create_table "uploaded_files", force: :cascade do |t|
    t.integer "task_id"
    t.string "file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_uploaded_files_on_task_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "photo"
    t.string "type", null: false
    t.string "card"
    t.string "telephone"
    t.string "about"
    t.integer "qualification"
    t.integer "position_id"
    t.boolean "halftime"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
