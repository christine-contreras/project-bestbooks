class User < ApplicationRecord
    has_secure_password
    validates :email, {presence: true, uniqueness: true}

    has_many :bookclub_profiles
    has_many :bookclubs, through: :bookclub_profiles
end
