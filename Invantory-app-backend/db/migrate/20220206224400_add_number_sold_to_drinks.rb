class AddNumberSoldToDrinks < ActiveRecord::Migration[6.1]
  def change
    add_column :drinks, :number_sold, :integer, default: 0, null: false
  end
end
