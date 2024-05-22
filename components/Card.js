import React from 'react';
import styles from '../styles/Card.module.css';

const Card = ({ task, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.content}>{task.category.name}</p>
    </div>
  );
};

export default Card;