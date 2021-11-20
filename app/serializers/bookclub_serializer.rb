class BookclubSerializer < ActiveModel::Serializer
  attributes :id, :name, :admin

  has_many :profiles
end
