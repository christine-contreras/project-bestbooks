class GuideQuestionSerializer < ActiveModel::Serializer
  attributes :id, :chapter, :question
  has_many :comments
end
