class BookclubBook < ApplicationRecord
  belongs_to :bookclub
  belongs_to :book
  has_many :goals

  validates :book_id, {presence: true }
  validates :bookclub_id, {presence: true }
  validates :status, inclusion: { in: ['Not Started', 'In Progress', 'Finished']}
end
