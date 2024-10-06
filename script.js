document.getElementById('addButton').addEventListener('click', function() {
    const todoList = document.getElementById('todoList');

    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';

    // 체크 박스 추가
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // 입력 필드 추가
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = '할 일을 입력하세요';

    // 삭제 버튼 추가
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'x';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() {
        todoList.removeChild(todoItem);
    };

    // 체크 박스와 입력 필드, 삭제 버튼을 todoItem에 추가
    todoItem.appendChild(checkbox);
    todoItem.appendChild(inputField);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
});
