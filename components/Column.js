import React from 'react';
import Card from './Card';
import styles from '../styles/Column.module.css';

const Column = ({ name, tasks, onCardClick }) => {
  return (
    <div className={styles.column}>
      <h2 className={styles.title}>{name}</h2>
      {tasks.map((task, index) => (
        <Card key={index} task={task} onClick={() => onCardClick(task)} />
      ))}
    </div>
  );
};

export default Column;