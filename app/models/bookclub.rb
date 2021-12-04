class Bookclub < ApplicationRecord
    validates :name, {presence: true }
    has_many :bookclub_users, dependent: :destroy
    has_many :users, through: :bookclub_users
    has_many :bookclub_books, dependent: :destroy
    has_many :books, through: :bookclub_books
end
