class CreateGoals < ActiveRecord::Migration[6.1]
  def change
    create_table :goals do |t|
      t.belongs_to :bookclub_book, null: false, foreign_key: true
      t.text :pages, array: true, default: []
      t.date :deadline
      t.boolean :complete

      t.timestamps
    end
  end
end
