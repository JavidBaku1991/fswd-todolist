import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

export const indexTasks = (successCB, errorCB) => {
  $.ajax({
    type: 'GET',
    url: '/api/tasks?api_key=1',
    success: successCB,
    error: errorCB
  });
};

export const postTask = (content, successCB, errorCB) => {
  $.ajax({
    type: 'POST',
    url: '/api/tasks?api_key=1',
    data: { task: { content: content } },
    success: successCB,
    error: errorCB
  });
};

export const deleteTask = (id, successCB, errorCB) => {
  $.ajax({
    type: 'DELETE',
    url: `/api/tasks/${id}?api_key=1`,
    success: successCB,
    error: errorCB
  });
};

export const toggleTask = (id, completed, successCB, errorCB) => {
  const action = completed ? 'mark_complete' : 'mark_active';
  $.ajax({
    type: 'PUT',
    url: `/api/tasks/${id}/${action}?api_key=1`,
    success: successCB,
    error: errorCB
  });
};
