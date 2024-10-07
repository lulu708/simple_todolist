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
        inputField.value = todo; // 기존 항목의 내용 설정

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'x';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            todoList.removeChild(todoItem);
            saveTodos(); // 삭제 후 저장
        };

        inputField.addEventListener('input', saveTodos); // 입력 시 저장

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

    // 이미지 다운로드 함수
    window.downloadImage = function() {
        // 현재 위젯 요소를 캡처
        html2canvas(document.querySelector('.container')).then(canvas => {
            // 이미지 데이터를 URL로 변환
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'todolist.png'; // 다운로드할 파일 이름
            link.click(); // 다운로드 트리거
        });
    }
});
