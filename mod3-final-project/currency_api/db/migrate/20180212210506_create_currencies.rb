class CreateCurrencies < ActiveRecord::Migration[5.1]
  def change
    create_table :currencies do |t|
      t.string :original_currency
      t.string :conversion_currency
      t.integer :amount_entered
      t.timestamps
    end
  end
end
