class CreateTodos < ActiveRecord::Migration[4.2]
  def change
    create_table :todos do |t|

      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
