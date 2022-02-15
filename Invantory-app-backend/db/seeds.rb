# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Alcohol.destroy_all()
Mixer.destroy_all()
Drink.destroy_all()
User.destroy_all()


users = ["user@user.com","justin@email.com","luke@email.com"]
alcohols = ["Jim Beam", "Jack Daniels", "Woodford Reserve", "Jamerson's Irish Whisky", "Congnac", "Henesey", "Port", "Ardbeg", "Mezcal", "Archie Rose Gin" ]
mixers = ["Coke","Sprite","Tonic Water","Soda Water","Ginger Beer", "Fanta", "Red-Bull", "V", "Mother", "Mountain Dew", "Dr. Pepper", "Creaming Soda", "Pepsi", "Root Beer" ]


users.each do |user|
    User.create!(
        username: user,
        password: "password",
        password_confirmation: "password",
        is_active: true
      )
      puts "User Account created for #{user}"
end

admin = User.create!(
  username: "admin@admin.com",
  password: "password123",
  password_confirmation: "password123",
  admin:true,
  is_active: true
)

deactivated = User.create!(
  username: "de@de.com",
  password: "password123",
  password_confirmation: "password123",
  admin:false,
  is_active: false
)

alcohols.each do |alcohol|

  Alcohol.create!(
    name: alcohol,
    volume_in_ml: rand(1...2000),
    user_id: User.all.pluck(:id).sample,
    critical_volume: rand(1...2000),
  )

  puts "New Alcohol Created #{alcohol}"
end

mixers.each do |mixer|

  Mixer.create!(
    name: mixer,
    volume_in_ml: 280,
    user_id: User.all.pluck(:id).sample,
    critical_volume: rand(1...2000),
  )

  puts "New Mixer Created #{mixer}"
end

for i in 0..10
  
  alcohol = Alcohol.all.sample
  mixer = Mixer.all.sample

  new_drink = Drink.create!(
    alcohol_id: alcohol.id,
    mixer_id: mixer.id,
    name: "#{alcohol.name}" + " and " "#{mixer.name}",
    user_id: User.all.pluck(:id).sample,
    alcohol_amount: rand(1...100),
    mixer_amount: rand(1...100),
    number_sold: rand(1...100)
  )

  puts "#{new_drink.name} created."

end

puts "----------------------------------"
puts "Admin username: admin@admin.com"
puts "Admin password: password123"
puts "----------------------------------"
