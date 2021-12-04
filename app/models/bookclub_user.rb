class BookclubUser < ApplicationRecord
    belongs_to :user
    belongs_to :bookclub
  
    validates :user_id, {presence: true }
    validates :bookclub_id, {presence: true }
end
