import React from 'react';
import styles from '../styles/TaskDetailModal.module.css';
import { deleteTask } from '../api/tasks';

const TaskDetailModal = ({ task, categories, isOpen, onClose, onUpdate, onFetch }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTask = {
      ...task,
      title: event.target.elements.title.value,
      body: event.target.elements.body.value,
      categoryId: event.target.elements.category.id.value,
      status: event.target.elements.status.value
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
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              タイトル
              <input name="title" defaultValue={task.title} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              本文
              <textarea
                defaultValue={task.body}
                name="body"
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              カテゴリー:
              <select name="category" defaultValue={task.categoryId}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              ステータス: 
              <select
                defaultValue={task.status}
              >
                <option value="draft">下書き</option>
                <option value="published">公開</option>
              </select>
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