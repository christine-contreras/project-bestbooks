class BookclubUserSerializer < ActiveModel::Serializer
    attributes :id, :name, :admin

    has_many :users

    def admin
        user_id = self.object.bookclub_users.find {|user| user.isAdmin == true }.user_id
        user = User.find_by(id: user_id)
        
        {
            id: user.id, 
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name

        }
    end
  end
  