class ChangeColumnGenresBooksToArray < ActiveRecord::Migration[6.1]
  def change
    change_column :books, :genres, :text, array: true, default: []
  end
end
