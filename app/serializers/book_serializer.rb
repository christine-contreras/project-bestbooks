class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :series, :author, :pages, :description, :publicationDate, :imageURL, :genres

  has_many :bookclubs
  has_many :bookclub_books 
end
