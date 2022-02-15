require 'rails_helper'

RSpec.describe Mixer, type: :model do
  it "is valid with valid attributes" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    expect(mixer).to be_valid
  end
  
  it "is not valid without a volume_in_ml" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    mixer = Mixer.create(name: 'test', volume_in_ml: nil, critical_volume: 0, user_id: user.id)
    expect(mixer).to_not be_valid
  end
  
  it "is valid without a critical volume" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: nil, user_id: user.id)
    expect(mixer).to_not be_valid
  end

  it "is not valid without a name" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    mixer = Mixer.create(name: nil, volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    expect(mixer).to_not be_valid
  end

  it "is not valid without a user" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: nil)
    expect(mixer).to_not be_valid
  end

  it "is not valid with conflicting names" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    mixer1 = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    mixer2 = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    expect(mixer2).to_not be_valid
  end

  it "volume_in_ml is not valid with string attribute" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    mixer = Mixer.create(name: 'test', volume_in_ml: "fail", critical_volume: 0, user_id: user.id)
    expect(mixer).to_not be_valid
  end

  it "critical_volume is not valid with string attribute" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: "fail", user_id: user.id)
    expect(mixer).to_not be_valid
  end

  it "(Drinks) is changed when destroying mixer" do
    user =  User.create(username: "luke", password: "qwfp1", password_confirmation: "qwfp1")
    mixer = Mixer.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    alcohol = Alcohol.create(name: 'test', volume_in_ml: 0, critical_volume: 0, user_id: user.id)
    drink = Drink.create(name: 'test', mixer: mixer, alcohol: alcohol, user_id: user.id)
    expect { mixer.destroy }.to change { Drink.count }
  end
end