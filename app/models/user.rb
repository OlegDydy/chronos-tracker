class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :trackable
  
  has_many :comments, class_name: "Comment", as: :commentable
  has_many :my_projects, class_name: "Project", foreign_key: "owner_id"
end
