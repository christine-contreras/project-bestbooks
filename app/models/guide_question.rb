class GuideQuestion < ApplicationRecord
    belongs_to :bookclub_book
    has_many :comments, dependent: :destroy

    validates :bookclub_book_id, {presence: true }
    validates :question, {presence: true }
    validates :chapter, {presence: true }
    validates :chapter, numericality: true
end
