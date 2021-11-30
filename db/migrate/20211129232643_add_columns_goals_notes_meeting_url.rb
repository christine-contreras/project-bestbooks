class AddColumnsGoalsNotesMeetingUrl < ActiveRecord::Migration[6.1]
  def change
    add_column :goals, :notes, :text
    add_column :goals, :meetingURL, :text
  end
end
