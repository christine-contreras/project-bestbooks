class AddColumnBookclubBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :bookclub_books, :current, :boolean
  end
end
