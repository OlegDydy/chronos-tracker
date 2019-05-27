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

ActiveRecord::Schema.define(version: 2019_05_24_083404) do

  create_table "comments", force: :cascade do |t|
    t.integer "task_id"
    t.integer "user_id"
    t.integer "admin_id"
    t.text "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customers", force: :cascade do |t|
    t.integer "user_id"
    t.string "card"
    t.string "telephone"
    t.string "about"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_customers_on_user_id"
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
    t.string "name"
    t.integer "customer_id"
    t.string "description"
    t.string "workflow"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_projects_on_customer_id"
    t.index ["name"], name: "index_projects_on_name"
  end

  create_table "tasks", force: :cascade do |t|
    t.integer "project_id"
    t.string "title"
    t.text "description"
    t.text "new_description"
    t.integer "state"
    t.integer "mark"
    t.date "deadline"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tracks", force: :cascade do |t|
    t.integer "user_id"
    t.integer "task_id"
    t.datetime "begin"
    t.datetime "end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "uploaded_files", force: :cascade do |t|
    t.integer "task_id"
    t.string "file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "login"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email"
    t.index ["login"], name: "index_users_on_login"
  end

  create_table "workers", force: :cascade do |t|
    t.integer "user_id"
    t.integer "qualification"
    t.integer "position"
    t.boolean "halftime"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["position"], name: "index_workers_on_position"
    t.index ["qualification"], name: "index_workers_on_qualification"
    t.index ["user_id"], name: "index_workers_on_user_id"
  end

end
