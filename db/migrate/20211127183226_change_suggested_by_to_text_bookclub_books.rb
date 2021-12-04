class ChangeSuggestedByToTextBookclubBooks < ActiveRecord::Migration[6.1]
  def change
    change_column :bookclub_books, :suggested_by, :text
  end
end
