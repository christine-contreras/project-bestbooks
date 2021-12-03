class BookclubSerializer < ActiveModel::Serializer
  attributes :id, :name, :admin

  has_many :users
  has_many :bookclub_books
  
  
  def admin
    user_id = self.object.bookclub_users.find {|user| user.isAdmin == true }.user_id
    if user_id 
      user = User.find_by(id: user_id)
    
      {
          id: user.id, 
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
  
      }
    end
   
  end

  
end
