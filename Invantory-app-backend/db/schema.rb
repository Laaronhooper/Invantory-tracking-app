# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_02_06_224400) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alcohols", force: :cascade do |t|
    t.string "name", null: false
    t.integer "volume_in_ml", default: 0, null: false
    t.integer "critical_volume", default: 0, null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_alcohols_on_user_id"
  end

  create_table "drinks", force: :cascade do |t|
    t.string "name", null: false
    t.integer "alcohol_amount", default: 0, null: false
    t.bigint "alcohol_id", null: false
    t.bigint "mixer_id", null: false
    t.integer "mixer_amount", default: 0, null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "number_sold", default: 0, null: false
    t.index ["alcohol_id"], name: "index_drinks_on_alcohol_id"
    t.index ["mixer_id"], name: "index_drinks_on_mixer_id"
    t.index ["user_id"], name: "index_drinks_on_user_id"
  end

  create_table "mixers", force: :cascade do |t|
    t.string "name", limit: 30, null: false
    t.integer "volume_in_ml", default: 0, null: false
    t.integer "critical_volume", default: 0, null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_mixers_on_name", unique: true
    t.index ["user_id"], name: "index_mixers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest"
    t.boolean "admin", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "is_active", default: true, null: false
  end

  add_foreign_key "alcohols", "users"
  add_foreign_key "drinks", "alcohols"
  add_foreign_key "drinks", "mixers"
  add_foreign_key "drinks", "users"
  add_foreign_key "mixers", "users"
end
