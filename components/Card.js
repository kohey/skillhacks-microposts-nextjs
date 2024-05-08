import React from 'react';
import styles from '../styles/Card.module.css';

const Card = ({ task, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3 className={styles.content}>{task.content}</h3>
      <p className={styles.due_date}>期限: {task.dueDate}</p>
    </div>
  );
};

export default Card;