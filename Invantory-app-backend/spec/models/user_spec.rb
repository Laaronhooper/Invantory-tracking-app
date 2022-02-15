require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid with valid attributes" do
    user =  User.create(username: "test_name", password: "qwfp1", password_confirmation: "qwfp1")
    expect(user).to be_valid
  end

  it "is not valid without username" do
    user =  User.create(username: nil, password: "qwfp1", password_confirmation: "qwfp1")
    expect(user).to_not be_valid
  end
  
  it "is not valid without password" do
    user =  User.create(username: 'test_name', password: nil, password_confirmation: "qwfp1")
    expect(user).to_not be_valid
  end
  
  it "is not valid without password" do
    user =  User.create(username: 'test_name', password: "qwfp1", password_confirmation: "qwfp2")
    expect(user).to_not be_valid
  end
end