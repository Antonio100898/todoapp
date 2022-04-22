import styles from "./App.module.css";
import React from "react";
import MyTodos from "./components/Todos/myTodos";

function App() {

 
     
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Todo app</div>
      <div className={styles.app}>
        <div className={styles.main_content}>
         <MyTodos  />
        </div>
      </div>
    </div>
  );
}

export default App;
