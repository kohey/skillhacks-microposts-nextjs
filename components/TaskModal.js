import React, { useState } from 'react';
import styles from '../styles/TaskModal.module.css';

const TaskModal = ({ categories, isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || '')
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({ title, body, category_id: category, status });
    setTitle('');
    setBody('');
    setCategory('')
    setStatus('');
    onClose();
  };  

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>記事を新規作成</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              タイトル
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              本文
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              カテゴリー:
              <select name="category" onChange={(e) => setCategory(e.target.value)}>
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="draft">下書き</option>
                <option value="published">公開</option>
              </select>
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