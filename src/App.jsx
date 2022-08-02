import styles from "./App.module.css";
import MyTodos from "./components/Todos/myTodos";
console.log(window.visualViewport.width)
function App() {
  return (
    <div className={styles.wrapper}>
         <MyTodos />
    </div>
  );
}

export default App;
