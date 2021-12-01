class GuideQuestion < ApplicationRecord
    belongs_to :bookclub_book

    validates :bookclub_book_id, {presence: true }
    validates :question, {presence: true }
    validates :chapter, {presence: true }
    validates :chapter, numericality: true
end
