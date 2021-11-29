class BookclubBookSerializer < ActiveModel::Serializer
  

  attributes :id, :book_id, :bookclub_id, :status, :archived, :suggested_by
  # attributes :id, :book_id, :book, :bookclub_id, :bookclub, :status, :wishlist, :suggested_by
  belongs_to :book
  # belongs_to :bookclub
 
  
  # def book
  #   book = Book.find(self.object.book_id)
  #   book.title
  # end

  # def bookclub
  #   bookclub = Bookclub.find(self.object.bookclub_id)
  #   bookclub.name
  # end
end
