document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('todoList');

    // 저장된 투두리스트 항목 불러오기
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => {
        addTodoItem(todo);
    });

    document.getElementById('addButton').addEventListener('click', function() {
        const newTodo = '';
        addTodoItem(newTodo);
    });

    function addTodoItem(todo) {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = '할 일을 입력하세요';
        inputField.value = todo;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'x';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            todoList.removeChild(todoItem);
            saveTodos();
        };

        inputField.addEventListener('input', saveTodos);

        todoItem.appendChild(checkbox);
        todoItem.appendChild(inputField);
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
    }

    function saveTodos() {
        const todos = [];
        const items = document.querySelectorAll('.todo-item input[type="text"]');
        items.forEach(item => {
            todos.push(item.value);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // 캡처 버튼 클릭 시 html2canvas를 사용해 PNG 파일로 내보내기
    document.getElementById('captureButton').addEventListener('click', function() {
        html2canvas(document.querySelector('.container')).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'todo-list.png';
            link.click();
        });
    });
});
