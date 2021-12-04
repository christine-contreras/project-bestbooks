class AddIsAdminToBookclubProfiles < ActiveRecord::Migration[6.1]
  def change
    add_column :bookclub_users, :isAdmin, :boolean
  end
end
