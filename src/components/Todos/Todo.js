import React from "react";
import styles from "./../../App.module.css"

const Todo = ({text, deleteTodo, id, completed, completeHandler }) => {
   
    return<>
     <div className={completed? styles.todo + " " + styles.done : styles.todo}>
        {text}
    </div>
    <div className={styles.buttons_wrapper}>
        {(<button className={completed? styles.v_green_button : styles.defauld_v_button} onClick={() => completeHandler(id)}>V</button>)}
        <button className={styles.delete_button} onClick={() => deleteTodo(id)}>-</button>
        </div>
    </>
}

export default Todo;