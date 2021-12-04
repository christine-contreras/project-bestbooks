class AddSuggestedByToBookclubBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :bookclub_books, :suggested_by, :string
  end
end
