import React from 'react';
import styles from '../styles/ArticleDetailModal.module.css';
import { deletearticle } from '../api/articles';

const articleDetailModal = ({ article, categories, isOpen, onClose, onUpdate, onFetch }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedarticle = {
      ...article,
      title: event.target.elements.title.value,
      body: event.target.elements.body.value,
      category_id: event.target.elements.category_id.value,
      status: event.target.elements.status.value
    };
    onUpdate(updatedarticle);
  };

  const handleDelete = async() => {
    if (window.confirm('本当に削除しますか？')) {
      await deletearticle(article.id);
      onClose();
      onFetch();
    }
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>記事編集</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              タイトル
              <input name="title" defaultValue={article.title} className={styles.input} />
            </label>
            <label className={styles.label}>
              本文
              <textarea
                defaultValue={article.body}
                name="body"
                className={styles.textarea}
              />
            </label>
            <label className={styles.label}>
              カテゴリー
              <select name="category_id" defaultValue={article.categoryId} className={styles.select}>
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
                name="status"
                defaultValue={article.status}
                className={styles.select}
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

export default articleDetailModal;
