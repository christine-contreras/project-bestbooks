class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :full_name, :location, :profile_color

  has_many :bookclubs

  def full_name
    "#{self.object.first_name} #{self.object.last_name}"
  end
end
