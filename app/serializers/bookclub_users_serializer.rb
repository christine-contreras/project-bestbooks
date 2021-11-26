class BookclubUsersSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :user, :bookclub_id, :bookclub

  def user
    user = User.find(self.object.user_id)
    "#{user.first_name} #{user.last_name}"
  end

  def bookclub
    bookclub = Bookclub.find(self.object.bookclub_id)
    bookclub.name
  end
end
