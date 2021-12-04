class BookclubBookSerializer < ActiveModel::Serializer
  

  attributes :id, :book_id, :bookclub_id, :status, :archived, :current, :suggested_by
  belongs_to :book
  # belongs_to :bookclub
  has_many :goals
  has_many :guide_questions

end
