class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :guide_question

  validates :comment, {presence: true}
  validates :user_id, {presence: true}
  validates :guide_question_id, {presence: true}
end
