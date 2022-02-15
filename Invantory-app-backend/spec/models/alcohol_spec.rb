require 'rails_helper'

RSpec.describe Alcohol, type: :model do
  it "is valid with valid attributes" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    expect(alcohol).to be_valid
  end
  
  it "is not valid without a volume_in_ml" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: nil, critical_volume: 0, user_id: user.id)
    expect(alcohol).to_not be_valid
  end
  
  it "is valid without a critical volume" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: nil, user_id: user.id)
    expect(alcohol).to_not be_valid
  end

  it "is not valid without a name" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: nil, volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    expect(alcohol).to_not be_valid
  end

  it "is not valid without a user" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: nil)
    expect(alcohol).to_not be_valid
  end

  it "is not valid with conflicting names" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol1 = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    alcohol2 = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    expect(alcohol2).to_not be_valid
  end

  it "volume_in_ml is not valid with string attribute" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: "fail", critical_volume: 0, user_id: user.id)
    expect(alcohol).to_not be_valid
  end

  it "critical_volume is not valid with string attribute" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: "fail", user_id: user.id)
    expect(alcohol).to_not be_valid
  end

  it "(Drinks) is changed when destroying alcohol" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    drink = Drink.create(alcohol: alcohol, mixer: mixer, name: 'test', user_id: user.id)
    expect { alcohol.destroy }.to change { Drink.count }
  end
end