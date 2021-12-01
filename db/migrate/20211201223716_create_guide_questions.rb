class CreateGuideQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :guide_questions do |t|
      t.string :question
      t.integer :chapter
      t.belongs_to :bookclub_book

      t.timestamps
    end
  end
end
