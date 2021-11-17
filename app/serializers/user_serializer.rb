class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :full_name, :location, :profile_color

  def full_name
    "#{first_name} #{last_name}"
  end
end
