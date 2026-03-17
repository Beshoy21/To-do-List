$(document).ready(function(){
    // Return todos from localstorage or set todos = []
    let todos = JSON.parse(localStorage.getItem('todoTasks')) || [];
 
    // let todos = [
    //     {text : "Javascript" , completed : false} ,
    //     {text : "Php" , completed : false},
    // ]
 
    function renderTodos() {
        // Prevent Duplication
        $('ul').empty();
 
        // Iterate Over Todos
        // for(let index in todos) {
        //     console.log(todos[index]); // value  
        // }
 
        todos.forEach((todo , index) => {
             
            const isCompleted = todo.completed ? 'completed' : ''
            const isChecked = todo.completed ? 'checked' : ""
            const li = `
                <li class="list-group-item d-flex justify-content-between
                align-items-center">
                    <div>
                        <input type="checkbox"
                        class="form-check-input toggle-todo">
                        <label class="form-check-label ${isCompleted}"
                        data-id=${index} ${isChecked}>
                            ${todo.text}
                        </label>
                    </div>
                    <button class="btn btn-danger btn-sm delete"
                     data-id="${index}"> Delete
                    </button>
                </li>
            `
            $('ul').append(li);
        });
 
        }
 
    
 
     function saveTodoAndReloadPage() {
        localStorage.setItem('todoTasks' , JSON.stringify(todos));
        renderTodos();
     }
 
     $("#addTask").on('click' , function() {
        const todoText = $("#taskInput").val().trim()
        if(todoText !== "") {
            todos.push({text : todoText , completed : false})
            $("#taskInput").val("");
            saveTodoAndReloadPage();
        }
     })
 
     $("#taskInput").on('keypress' , function(event) {
        if(event.which === 13) {
            $("#addTask").click()
        }
     })

     // Delete Todo Task
     $("ul").on('click' , '.delete' , function() {
        const todoId = $(this).data('id')
        todos.splice(todoId , 1);
        saveTodoAndReloadPage();
     })

     $("ul").on('change' , '.toggle-todo' , function(){
       const todoId = $(this).data('id')
      todos[todoId].completed = !todos[todoId].completed 
      saveTodoAndReloadPage();

     })

 
    renderTodos();
})