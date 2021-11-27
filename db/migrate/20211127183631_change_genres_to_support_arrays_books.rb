class ChangeGenresToSupportArraysBooks < ActiveRecord::Migration[6.1]
  def change
    
    change_column :books, :author, :text
  end
end
