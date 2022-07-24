import { useEffect, useState } from "react";
import Todo from "./Todo";
import styles from "./../../App.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button, IconButton } from "@mui/material";

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
  }, [status, todos]);

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
        { id: Math.random() * 1000, text: todo, completed: false },
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
  const clearAllTodos = () => setTodos([]);

  const sx = {
    addButton: {
      width: "10%",
      backgroundColor: "white",
      cursor: "pointer",
      border: "grey 1px solid",
      marginLeft: "0.4vw",
      borderRadius: "0.2vw",
      "&:hover": {
        backgroundColor: "purple",
      },
    },
    clearButton: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
      backgroundColor: 'purple',
      color: 'white',
      padding: '',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: 'purple'
      }
    },
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>Todo App</div>
      <div>Anton Mishanin</div>
      <div className={styles.box_content}>
        <div className={styles.add_todo_field}>
          <input
            maxLength={30}
            placeholder="Add your new todo"
            className={styles.input}
            value={todo}
            type="text"
            onChange={handleNewTodo}
          />
          <IconButton color="secondary" sx={sx.addButton} onClick={onAddTodo}>
            <AddBoxIcon />
          </IconButton>
        </div>
        <div className={styles.filter}>
          <p>Filter by: </p>
          <select className={styles.select} onChange={statusHandler}>
            <option className={styles.option} value={"all"}>
              all
            </option>
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
        <div className={styles.footer}>
          <p>You have {todos.length > 0? todos.length : 'no'} pending tasks</p>
          <Button onClick={clearAllTodos} sx={sx.clearButton}>Clear All</Button>
        </div>
      </div>
    </div>
  );
};

export default MyTodos;
