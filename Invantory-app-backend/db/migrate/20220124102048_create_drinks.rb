class CreateDrinks < ActiveRecord::Migration[6.1]
  def change
    create_table :drinks do |t|
      t.string :name, null: false
      t.integer :alcohol_amount, null: false, default: 0
      t.references :alcohol, null: false, foreign_key: true
      t.references :mixer, null: false, foreign_key: true
      t.integer :mixer_amount, null: false, default: 0
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
