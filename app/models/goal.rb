class Goal < ApplicationRecord
  belongs_to :bookclub_book

  validates :bookclub_book_id, {presence: true }
  validates :deadline, {presence: true }
  validates :pages, {presence: true }
  validates :pages, numericality: true
  validates :pages, length: { is: 2 }
end
