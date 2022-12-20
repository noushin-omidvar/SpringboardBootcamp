function addTask(todoObj){
    
    // Create new task element
    let newTask = document.createElement("li");
    
    // set the class to completed or notComplete
    // TODO toggle class based on todoObj.isDone
    newTask.classList.toggle(todoObj.class)
    newTask.innerText = todoObj.task +"\t";

    // Add id to item
    newTask.setAttribute("id", todoObj.id);
    
    // Add "remove" button
    const newButton = document.createElement("button");
    newButton.innerText = "Remove";
    newTask.append(newButton);

    // Add task to the list
    List.append(newTask);
}

// Access form and To Do list 
let form = document.querySelector("form#add");
let List = document.querySelector("#taskList");

// Retrieve local storage if any
let toDoObj = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
localStorage.setItem('items', JSON.stringify(toDoObj))

// On Page Load
for(let item of toDoObj){
    addTask(item)
}


// Listen for a task submission and add
form.addEventListener("submit", function(e){
    e.preventDefault()
    
    // Avoid empty submissions
    let newInput = document.querySelector("input#newTask").value;
    if (newInput === '') {
        alert("You must write something!");
    }
    // Add and store 
    else{
        const todo = {
            id: Date.now(),
            task: newInput,
            class: 'notCompleted',
        }
        addTask(todo) 
        
        // Update the local storage
        toDoObj.push(todo)
        localStorage.setItem('items', JSON.stringify(toDoObj))
    }
})

// On Complete Item
// On Removing an Item
List.addEventListener("click", function(e){
    e.preventDefault()
    Target = e.target

    // Mark as completed
    if (Target.tagName === "LI"){

        Target.classList.toggle("completed")
       
        // Mark as complete in local storage
        
        const id = Target.getAttribute("id")
        
        const itemIndex = toDoObj.findIndex(function(i) {             
            return i.id.toString() === id;
        });
        if (itemIndex >= 0) {
            console.log(toDoObj)
            toDoObj[itemIndex].class = Target.classList[Target.classList.length -1];
            console.log(toDoObj)
            localStorage.setItem('items', JSON.stringify(toDoObj));
        }
    }

    // Remove Task from To DO list
    if(Target.tagName === "BUTTON") {
        Target.parentElement.remove();
        
        // Delete from locally stored array
        let result = toDoObj.indexOf( Target.parentElement.textContent);
        let newlist = toDoObj.splice(result, 1);

        // Update the local storage
        localStorage.setItem('items', JSON.stringify(toDoObj))
      }
} )

