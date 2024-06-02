import React from 'react';
import Card from './Card';
import styles from '../styles/Column.module.css';

const Column = ({ task, onCardClick }) => {
  return (
    <div className={styles.column}>
      <Card task={task} onClick={() => onCardClick(task)} />
    </div>
  );
};

export default Column;
