import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);
// console.log(FILTER_NAMES);


function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter_name, setFilter] = useState("All");
  const filterList = FILTER_NAMES.map((name, index) => {
    return (
    <FilterButton 
    key={index} 
    name={name}
    isPressed={name === filter_name}
    setFilter={setFilter}
     />);}
  );  

  function toggleTaskCompleted(id) {
    // console.log("Current filter:", filter_name);
    // console.log("Tasks that match this filter:", tasks.filter(FILTER_MAP[filter_name]));
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {        
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    console.log("tasks:", tasks);
    console.log("Updated tasks:", updatedTasks);
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id == task.id) {
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  }


  const taskList = tasks
  .filter(FILTER_MAP[filter_name])
  .map((task) => <Todo 
    key={task.id}
    id={task.id}
    name={task.name}
    completed={task.completed}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />);
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      {/* form */}
      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">

        {/* button */}
        {filterList}


      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}

      </ul>
    </div>
  );
}

export default App;
