import React from 'react';
import styles from '../styles/TaskDetailModal.module.css';
import { deleteTask } from '../api/tasks';

const TaskDetailModal = ({ task, isOpen, onClose, onUpdate, onFetch }) => {
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

  const handleDelete = async() => {
    if (window.confirm('本当に削除しますか？')) {
      await deleteTask(task.id);
      onClose();
      onFetch();
    }
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
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
                <option value="pending">保留中</option>
                <option value="in_progress">進行中</option>
                <option value="completed">完了</option>
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
            <button type="button" onClick={handleDelete} className={styles.deleteButton}>削除</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailModal;