class User < ApplicationRecord
    has_secure_password
    validates :email, {presence: true, uniqueness: true}

    has_many :bookclub_users, dependent: :destroy
    has_many :bookclubs, through: :bookclub_users
    has_many :comments, dependent: :destroy
end
