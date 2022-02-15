class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :full_name, null: false
      t.string :password_digest
      t.boolean :admin, default: false
      t.timestamps
    end
  end
end
