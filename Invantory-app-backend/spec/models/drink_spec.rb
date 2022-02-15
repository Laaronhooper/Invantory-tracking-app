require 'rails_helper'

RSpec.describe Drink, type: :model do
  it "is valid with valid attributes" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    drink = Drink.create(alcohol: alcohol, mixer: mixer, name: 'test', user_id: user.id)
    expect(drink).to be_valid
  end
  
  it "is not valid without an alcohol " do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    drink = Drink.create(alcohol: nil, mixer: mixer, name: 'test', user_id: user.id)
    expect(drink).to_not be_valid
  end
  
  it "is not valid without a mixer" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    drink = Drink.create(alcohol: alcohol, mixer: nil, name: 'test', user_id: user.id)
    expect(drink).to_not be_valid
  end

  it "is not valid without a name" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    drink = Drink.create(alcohol: alcohol, mixer: mixer, name: nil, user_id: user.id)
    expect(drink).to_not be_valid
  end

  # it "is not valid without a user" do
  #   user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
  #   alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
  #   mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
  #   drink = Drink.create(alcohol: alcohol, mixer: mixer, name: 'test', user_id: nil)
  #   expect(drink).to_not be_valid
  # end

  it "is not valid with conflicting names" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    drink1 = Drink.create(alcohol: alcohol, mixer: mixer, name: 'test', user_id: user.id)
    drink2= Drink.create(alcohol: alcohol, mixer: mixer, name: 'test', user_id: user.id)
    expect(drink2).to_not be_valid
  end
end