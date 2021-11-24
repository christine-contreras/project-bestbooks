class Bookclub < ApplicationRecord
    validates :name, {presence: true }
    has_many :bookclub_users, dependent: :destroy
    has_many :users, through: :bookclub_users
end
