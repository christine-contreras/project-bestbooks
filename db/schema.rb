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

ActiveRecord::Schema.define(version: 2021_12_02_184243) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookclub_books", force: :cascade do |t|
    t.bigint "bookclub_id", null: false
    t.bigint "book_id", null: false
    t.boolean "archived"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "suggested_by"
    t.boolean "current"
    t.index ["book_id"], name: "index_bookclub_books_on_book_id"
    t.index ["bookclub_id"], name: "index_bookclub_books_on_bookclub_id"
  end

  create_table "bookclub_users", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "bookclub_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "isAdmin"
    t.index ["bookclub_id"], name: "index_bookclub_users_on_bookclub_id"
    t.index ["user_id"], name: "index_bookclub_users_on_user_id"
  end

  create_table "bookclubs", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "books", force: :cascade do |t|
    t.string "imageURL"
    t.string "title"
    t.string "series"
    t.string "description"
    t.integer "pages"
    t.string "publicationDate"
    t.text "genres", default: [], array: true
    t.text "author"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "guide_question_id", null: false
    t.text "comment"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guide_question_id"], name: "index_comments_on_guide_question_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "goals", force: :cascade do |t|
    t.bigint "bookclub_book_id", null: false
    t.text "pages", default: [], array: true
    t.date "deadline"
    t.boolean "complete"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "notes"
    t.text "meetingURL"
    t.index ["bookclub_book_id"], name: "index_goals_on_bookclub_book_id"
  end

  create_table "guide_questions", force: :cascade do |t|
    t.string "question"
    t.integer "chapter"
    t.bigint "bookclub_book_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bookclub_book_id"], name: "index_guide_questions_on_bookclub_book_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "location"
    t.string "profile_color"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "bookclub_books", "bookclubs"
  add_foreign_key "bookclub_books", "books"
  add_foreign_key "bookclub_users", "bookclubs"
  add_foreign_key "bookclub_users", "users"
  add_foreign_key "comments", "guide_questions"
  add_foreign_key "comments", "users"
  add_foreign_key "goals", "bookclub_books"
end
