class CreateMixers < ActiveRecord::Migration[6.1]
  def change
    create_table :mixers do |t|
      t.string :name, null: false, limit: 30
      t.integer :volume_in_ml, null: false, default: 0
      t.integer :critical_volume, null: false, default: 0
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :mixers, :name, unique: true
  end
end
