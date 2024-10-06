document.querySelector('.add-button').addEventListener('click', function() {
  const inputField = document.querySelector('.input-field');
  const todoText = inputField.value.trim();

  if (todoText) {
    const newTodoItem = document.createElement('div');
    newTodoItem.className = 'todo-item';
    newTodoItem.innerHTML = `
      <div class="checkbox"></div>
      <button class="delete-button" onclick="deleteItem(this)">×</button>
    `;

    document.querySelector('.todo-list').appendChild(newTodoItem); // 동적으로 추가
    inputField.value = ''; // 입력 필드 비우기
  }
});
