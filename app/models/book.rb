class Book < ApplicationRecord
    validates :title, {presence: true }
    validates :author, {presence: true }
    validates :imageURL, {presence: true }
    validates :description, {presence: true }

    has_many :bookclub_books, dependent: :destroy
    has_many :bookclubs, through: :bookclub_books 
end
