import React from 'react';
import styles from '../styles/Card.module.css';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const Card = ({ task, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.category}>{task.category.name}</p>
      <p className={styles.body}>{truncateText(task.body, 100)}</p>
    </div>
  );
};

export default Card;
