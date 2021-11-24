class RemoveAdminFromBookclubs < ActiveRecord::Migration[6.1]
  def change
    remove_column :bookclubs, :admin, :string
  end
end
