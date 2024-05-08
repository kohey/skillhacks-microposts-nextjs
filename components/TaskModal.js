import React, { useState } from 'react';
import styles from '../styles/TaskModal.module.css';

const TaskModal = ({ isOpen, onClose, onCreate }) => {
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({ content, dueDate });
    setContent('');
    setDueDate('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>タスクを新規作成</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>
              内容:
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </label>
            <label>
              期限:
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.createButton}>作成</button>
            <button onClick={onClose} className={styles.cancelButton}>キャンセル</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;