class ChangeBookclubProfilesToBookclubUsers < ActiveRecord::Migration[6.1]
  def change
    rename_table :bookclub_profiles, :bookclub_users
  end
end
