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

    // 카메라 버튼 클릭 시 동작
    document.getElementById('cameraButton').addEventListener('click', function() {
        const shouldDownload = confirm('PNG 파일로 저장하시겠습니까?');
        if (shouldDownload) {
            // 현재 위젯 요소를 캡처하여 새로운 탭에서 열기
            html2canvas(document.querySelector('.container')).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'todolist.png'; // 다운로드할 파일 이름

                // 새로운 창 열기
                const newWindow = window.open();
                newWindow.document.write('<html><head><title>To-Do List</title></head><body>');
                newWindow.document.write('<h1>Your To-Do List</h1>');
                newWindow.document.write('<img src="' + link.href + '" />');
                newWindow.document.write('</body></html>');
                newWindow.document.close(); // 페이지 로드 마무리
                link.click(); // 다운로드 트리거
            });
        }
    });
});

document.getElementById('copyLinkButton').addEventListener('click', function() {
    const todos = Array.from(document.querySelectorAll('.todo-item input[type="text"]'))
                       .map(item => '[] ' + item.value) // 각 투두 항목 앞에 '체크박스' 추가
                       .join('\n'); // 줄넘김 처리
    
                       
                       
    navigator.clipboard.writeText(todos)
        .then(() => {
            alert('투두 리스트가 클립보드에 복사되었습니다!');
        })
        .catch(err => {
            console.error('복사 실패:', err);
        });
});

window.downloadImage = function() {
    // 버튼들 숨기기
    document.getElementById('addButton').style.display = 'none';
    document.getElementById('copyLinkButton').style.display = 'none';
    document.getElementById('captureButton').style.display = 'none';

    // DOM이 업데이트되도록 잠시 대기한 후 캡처 실행
    setTimeout(function() {
        html2canvas(document.querySelector('.container')).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'todolist.png'; // 다운로드할 파일 이름
            link.click(); // 다운로드 트리거

            // 캡처 후 버튼들 다시 보이기
            document.getElementById('addButton').style.display = 'inline';
            document.getElementById('copyLinkButton').style.display = 'inline';
            document.getElementById('captureButton').style.display = 'inline';
        });
    }, 100); // 100ms 대기 (필요에 따라 시간 조정 가능)
}


