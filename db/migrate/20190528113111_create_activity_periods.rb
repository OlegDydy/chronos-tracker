class CreateActivityPeriods < ActiveRecord::Migration[5.2]
  def change
    create_table :activity_periods do |t|
      t.integer :track_id
      t.timestamp :begin
      t.timestamp :end
    end
    add_index :activity_periods, :track_id
  end
end
