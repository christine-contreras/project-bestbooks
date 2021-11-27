class CreateBookclubBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :bookclub_books do |t|
      t.belongs_to :bookclub, null: false, foreign_key: true
      t.belongs_to :book, null: false, foreign_key: true
      t.boolean :wishlist
      t.string :status

      t.timestamps
    end
  end
end
