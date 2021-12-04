class AddAdminToBookclubs < ActiveRecord::Migration[6.1]
  def change
    add_column :bookclubs, :admin, :string
    remove_column :bookclubs, :isAdmin
  end
end
