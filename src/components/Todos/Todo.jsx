import styles from "./../../App.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';

const Todo = ({ text, deleteTodo, id, completed, completeHandler }) => {
  return (
    <>
      <div className={completed? styles.todo + " " + styles.done : styles.todo}>
        <div>
          <p
            className={ styles.todo_text}
          >
            {text}
          </p>
        </div>
        <div className={styles.buttons_wrapper}>
          <div onClick={() => completeHandler(id)} className={styles.done_button}>
            <DoneIcon/>
          </div>
          <div onClick={() => deleteTodo(id)} className={styles.delete_button}>
            <DeleteIcon sx={{ color: "white" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
