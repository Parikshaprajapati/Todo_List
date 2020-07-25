//selectors
const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");


//Event Listener
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);


//functions

function addTodo(event){
   //prevent form from submitting
    event.preventDefault();
   //todo DIV
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");
   //create LI
    const newtodo=document.createElement('li');
    newtodo.innerText=todoInput.value;
    newtodo.classList.add('todo-item');
    todoDiv.appendChild(newtodo);
   //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
   //CHECK MARK BUTTON
    const completedbutton=document.createElement('button');
    completedbutton.innerHTML='<i class="fas fa-check"></i>';
    completedbutton.classList.add("complete-btn");
    todoDiv.appendChild(completedbutton);
   //CHECK TRASH BUTTON
    const trashbutton=document.createElement('button');
    trashbutton.innerHTML='<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);
   //APPEND  TO LIST
    todoList.appendChild(todoDiv);
   //CLEAR TODO INPUT VALUE
    todoInput.value="";
    
}


function deleteCheck(e){
  const item=e.target;
//DELETE TODO
  if(item.classList[0]==="trash-btn"){
      const todo=item.parentElement;
      //animation
      
      todo.classList.add('fall');
      removeLocalTodos(todo);
     todo.addEventListener('transitionend',function(){
          todo.remove();
     });
  }
    
//CHECK MARK
  if(item.classList[0]==="complete-btn"){
      const todo=item.parentElement;
      todo.classList.toggle('completed');
  }
}

function filterTodo(e){
    
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
      switch(e.target.value){
          case "all":
              todo.style.display='flex';
              break;
          case "completed":
            if(todo.classList.contains('completed')){
                console.log("completed");
              todo.style.display='flex';
              }else{
                  todo.style.display='none';
              }
              break;
          case "uncompleted":
            if(!todo.classList.contains('completed')){
                console.log("uncompleted");
              todo.style.display='flex';
              }else{
                  todo.style.display='none';
              }
              break;
              
      }  
    });
}



function saveLocalTodos(todo){
    //CHECK=--HEYdi i already have thing in there
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
    todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
localStorage.setItem("todos",JSON.stringify(todos));
}


function getTodos(){
    let todos;
     //CHECK=--HEYdi i already have thing in there
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
    todos=JSON.parse(localStorage.getItem('todos'));
    }
  todos.forEach(function(todo){
     //todo DIV
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");
   //create LI
    const newtodo=document.createElement('li');
    newtodo.innerText=todo;
    newtodo.classList.add('todo-item');
    todoDiv.appendChild(newtodo);
  
   //CHECK MARK BUTTON
    const completedbutton=document.createElement('button');
    completedbutton.innerHTML='<i class="fas fa-check"></i>';
    completedbutton.classList.add("complete-btn");
    todoDiv.appendChild(completedbutton);
   //CHECK TRASH BUTTON
    const trashbutton=document.createElement('button');
    trashbutton.innerHTML='<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);
   //APPEND  TO LIST
    todoList.appendChild(todoDiv);  
  });
    
}


function removeLocalTodos(todo){
    let todos;
     //CHECK=--HEYdi i already have thing in there
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
    todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}


























