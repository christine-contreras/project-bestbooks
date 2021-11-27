class BookclubBookSerializer < ActiveModel::Serializer
  attributes :id, :book_id, :book, :bookclub_id, :bookclub, :status, :wishlist, :recommender

  def book
    book = Book.find(self.object.book_id)
    book.title
  end

  def bookclub
    bookclub = Bookclub.find(self.object.bookclub_id)
    bookclub.name
  end

  def recommender
    user = self.object.suggested_by
    {
      first_name: user.first_name 
      last_name: user.last_name 
      full_name: "#{user.first_name} #{user.last_name}"
      profile_color:  user.profile_color
    }
  end
end
