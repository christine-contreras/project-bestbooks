class ChangeGenresToSupportArraysBooks < ActiveRecord::Migration[6.1]
  def change
    change_column :books, :genres, "varchar[] USING (string_to_array(genres, ','))"
    change_column :books, :author, :text
  end
end
