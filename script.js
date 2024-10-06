document.getElementById('addButton').addEventListener('click', function() {
    const todoList = document.getElementById('todoList');

    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = '할 일을 입력하세요';

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'x';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() {
        todoList.removeChild(todoItem);
    };

    todoItem.appendChild(inputField);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
});
