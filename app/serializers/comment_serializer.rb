class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :guide_question_id, :comment, :username

  def username
    user = User.find(self.object.user_id)
    "#{user.first_name} #{user.last_name}"
  end
end
