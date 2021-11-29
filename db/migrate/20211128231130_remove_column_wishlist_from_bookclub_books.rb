class RemoveColumnWishlistFromBookclubBooks < ActiveRecord::Migration[6.1]
  def change
    rename_column :bookclub_books, :wishlist, :archived
  end
end
