import $ from 'jquery';

import { indexTasks, postTask } from './requests';

document.addEventListener('turbolinks:load', () => {
  console.log('Page loaded with Turbolinks.');

  // Fetch and render tasks
  function renderTasks() {
    indexTasks((response) => {
      const htmlString = response.map((task) => {
        return `
          <div class="task p-2 border rounded mb-3" data-id="${task.id}">
            <span>${task.content}</span>
            <button class="btn btn-sm btn-danger float-end remove-task">Remove</button>
            <button class="btn btn-sm btn-success float-end me-2 toggle-task">
              ${task.completed ? 'Mark Active' : 'Mark Complete'}
            </button>
          </div>`;
      }).join('');
      $('#tasks').html(htmlString);
    });
  }

  // Initial render of tasks
  renderTasks();

  // Add new task
  $('#add-task-form').on('submit', (e) => {
    e.preventDefault();
    const content = $('#new-task-content').val();
    if (!content.trim()) {
      alert('Task content cannot be empty!');
      return;
    }

    postTask(content, (response) => {
      $('#new-task-content').val('');
      renderTasks(); // Re-fetch and render tasks
    });
  });

  // Mark task as complete/active
  $('#tasks').on('click', '.toggle-task', function () {
    const taskId = $(this).closest('.task').data('id');
    const isCompleted = $(this).text().trim() === 'Mark Active';
    const toggleTask = isCompleted ? 'mark_active' : 'mark_complete';

    $.ajax({
      type: 'PUT',
      url: `/api/tasks/${taskId}/${toggleTask}?api_key=1`,
      success: renderTasks,
      error: (error) => console.error(error),
    });
  });

  // Remove task
  $('#tasks').on('click', '.remove-task', function () {
    const taskId = $(this).closest('.task').data('id');

    $.ajax({
      type: 'DELETE',
      url: `/api/tasks/${taskId}?api_key=1`,
      success: renderTasks,
      error: (error) => console.error(error),
    });
  });
});
