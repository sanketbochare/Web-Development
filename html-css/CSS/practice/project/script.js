//Select DOM Elements
const input=document.getElementById('todo-input');
const addBtn=document.getElementById('add-btn');
const list=document.getElementById('todo-list');


//Load saved todos from localStorage(if any)
const saved=localStorage.getItem('todos');
const todos=saved?JSON.parse(saved):[];


function saveTodos(){
    //save todos to localstorage
    localStorage.setItem('todos',JSON.stringify(todos));
}

//Create a DOM node for todo object and append it to the list
function createTodoNode(todo,index){
   const li=document.createElement('li');
   li.classList.add('todo-item');
   const checkbox=document.createElement('input');
   checkbox.type='checkbox';
   checkbox.classList.add('todo-checkbox')
   checkbox.checked=!!todo.completed;
   checkbox.addEventListener('change', ()=>{
       todo.completed=checkbox.checked;
          //
     textspan.style.textDecoration=todo.completed?'line-through':" ";     
    saveTodos();      
   })
   const textspan=document.createElement('span');
   textspan.textContent=todo.text;
   textspan.style.margin='0 8px';
   textspan.classList.add('todo-text')
   if(todo.completed){
    textspan.style.textDecoration='line-through'
   }
    //add double-click event listener to edit
    textspan.addEventListener("dblclick",()=>{
        const newText=prompt("Edit todo", todo.text);
        if(newText!==null){
            todo.text=newText.trim();
            textspan.textContent=todo.text;
            saveTodos();
        }
    })

    const delBtn=document.createElement('button');
    delBtn.textContent="Delete";
    delBtn.classList.add('todo-btn');
    delBtn.addEventListener("click",()=>{
    todos.splice(index,1);
    Render();
    saveTodos();
   })
   li.appendChild(checkbox);
   li.appendChild(textspan);
   li.appendChild(delBtn);
   return li;
   }
//Render the whole todo list from todos array
function Render(){
    list.innerHTML=" ";

    todos.forEach((todo , index) => {
        const node=createTodoNode(todo,index);
        list.appendChild(node);
        
    });
}

function addTodo(){
    const text=input.value.trim();
    if(!text){
        return;
    }
    todos.push({text, completed:false});
    input.value='';
    Render();
    saveTodos();
 
}

addBtn.addEventListener('click',addTodo);
input.addEventListener('keydown', (e)=>{
    if(e.key=='Enter'){
        addTodo();
    }
})
Render();