import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import styles from "./../../App.module.css";

const MyTodos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localTodos);
    }
  }, []);

  useEffect(() => {
    saveLocalTodos();
  }, [todos]);
  
  useEffect(() => {
    filterHandler();
  },[status, todos])

  const filterHandler = () => {
    switch (status) {

      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;

      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const onAddTodo = () => {
    if (todo !== "") {
      setTodos([
        ...todos,
        { id: Math.random() * 1000, text: todo, completed: false }
      ]);
    }
    setTodo("");
  };
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const handleNewTodo = (e) => {
    setTodo(e.target.value);
  };
  const deleteTodo = (id) => {
    setTodos([...todos.filter((t) => t.id !== id)]);
  };
  const completeHandler = (id) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) return { ...item, completed: !item.completed };
        else return { ...item };
      })
    );
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <div className={styles.add_todo_field}>
        <input
          maxLength={30}
          className={styles.input}
          value={todo}
          type="text"
          onChange={handleNewTodo}
        />
        <button className={styles.add_button} onClick={onAddTodo}>
         <span>+</span>
        </button>
      </div>
      <div className={styles.filter}>
        <select className={styles.select} onChange={statusHandler}>
          <option className={styles.option} value={"all"}>all</option>
          <option value={"completed"}>completed</option>
          <option value={"uncompleted"}>uncompleted</option>
        </select>
      </div>
      <div className={styles.todosWrapper}>
     
        {filteredTodos.map((t) => (
          <Todo
            key={t.id}
            {...t}
            deleteTodo={deleteTodo}
            completeHandler={completeHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTodos;
