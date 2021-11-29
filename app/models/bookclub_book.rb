class BookclubBook < ApplicationRecord
  belongs_to :bookclub
  belongs_to :book

  validates :book_id, {presence: true }
  validates :bookclub_id, {presence: true }
  # validates :archived, {presence: true }
  validates :status, inclusion: { in: ['Not Started', 'In Progress', 'Finished']}
end
