class Drink < ApplicationRecord
  belongs_to :mixer
  belongs_to :alcohol
  validates :name, uniqueness: true
  validates :name, :alcohol_id,:mixer_id,:alcohol_amount,:mixer_amount, presence: true

end
