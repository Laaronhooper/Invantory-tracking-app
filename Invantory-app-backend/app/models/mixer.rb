class Mixer < ApplicationRecord
  belongs_to :user
  has_many :drinks, dependent: :destroy

  validates :name,:volume_in_ml,:critical_volume, presence: true
  validates :name, uniqueness: true
  validates :volume_in_ml,:critical_volume, numericality: {only_integer: true}
end
