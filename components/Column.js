import React from 'react';
import Card from './Card';
import styles from '../styles/Column.module.css';

const Column = ({ article, onCardClick }) => {
  return (
    <div className={styles.column}>
      <Card article={article} onClick={() => onCardClick(article)} />
    </div>
  );
};

export default Column;
