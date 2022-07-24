import styles from "./App.module.css";
import MyTodos from "./components/Todos/myTodos";

function App() {
  return (
    <div className={styles.wrapper}>
         <MyTodos />
    </div>
  );
}

export default App;
