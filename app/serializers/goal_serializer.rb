class GoalSerializer < ActiveModel::Serializer
  attributes :id, :pages, :deadline, :complete, :notes, :meetingURL
end
