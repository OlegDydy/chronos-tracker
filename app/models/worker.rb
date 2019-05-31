
class Worker < User
  has_one :position, class_name: "Position", foreign_key: "position_id"
  has_many :tracks, class_name: "Track", foreign_key: "worker_id"
  has_and_belongs_to_many :projects, join_table: "projects_users", foreign_key: "project_id"
  after_create :create_personal_board
  
  def create_personal_board
    puts '[INFO] Personal board created!'
    project = self.projects.create! name: 'Self-Education', owner: self
    project.columns.create! name: 'TODO', position: 0
  end

end
