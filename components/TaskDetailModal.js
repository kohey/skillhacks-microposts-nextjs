import React from 'react';
import styles from '../styles/TaskDetailModal.module.css';
const TaskDetailModal = ({ task, isOpen, onClose, onUpdate }) => {
  if (!isOpen) return null;
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTask = {
      ...task,
      content: event.target.elements.content.value,
      status: event.target.elements.status.value,
      dueDate: event.target.elements.dueDate.value,
    };
    onUpdate(updatedTask);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>タスク詳細</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>
              内容:
              <input name="content" defaultValue={task.content} />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              ステータス:
              <select name="status" defaultValue={task.status}>
                <option value="pending">pending</option>
                <option value="inProgress">inProgress</option>
                <option value="completed">completed</option>
              </select>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              期限:
              <input type="date" name="dueDate" defaultValue={task.dueDate} />
            </label>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.updateButton}>更新</button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>キャンセル</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TaskDetailModal;