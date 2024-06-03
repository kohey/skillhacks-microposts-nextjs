import React, { useState } from 'react';
import styles from '../styles/ArticleModal.module.css';

const articleModal = ({ categories, isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('1')
  const [status, setStatus] = useState('draft');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({ title, body, category_id: category, status });
    setTitle('');
    setBody('');
    setCategory('1')
    setStatus('');
    onClose();
  };  

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>記事を新規作成</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              タイトル
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label className={styles.label}>
              本文
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </label>
            <label className={styles.label}>
              カテゴリー
              <select name="category_id" onChange={(e) => setCategory(e.target.value)}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.label}>
              ステータス 
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

export default articleModal;