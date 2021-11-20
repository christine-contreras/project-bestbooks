class Bookclub < ApplicationRecord
    validates :name, {presence: true }
    validates :isAdmin, { presence: true }
    has_many :bookclub_profiles
    has_many :profiles, through: :bookclub_profiles
end
