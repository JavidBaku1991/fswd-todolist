json.array! @tasks do |task|
  json.id task.id
  json.content task.content
  json.completed task.completed
end
