class BookclubSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :users
  
  

end
