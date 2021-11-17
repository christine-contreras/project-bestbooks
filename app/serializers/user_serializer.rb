class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :full_name, :location, :profile_color

  def full_name
    "#{self.object.first_name} #{self.object.last_name}"
  end
end
