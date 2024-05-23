import React, { useState, useEffect } from 'react';
import Column from './Column';
import TaskModal from './TaskModal';
import TaskDetailModal from './TaskDetailModal';
import styles from '../styles/Board.module.css';
import { fetchArticles, createTask, updateTask  } from '../api/tasks';
import { fetchCategories } from  '../api/categories';

const Board = () => {
  const [tasks, setTasks] = useState({
    articles: [],
    categories: [],
  });
  const getTasks = async () => {
    const fetchedArticles = await fetchArticles();
    const fetchedCategories = await fetchCategories();

    setTasks({
      articles: fetchedArticles,
      categories: fetchedCategories,
    });
  };

  useEffect(() => {
    getTasks();
  }, []);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); 

  const handleAddTask = async(newTask) => {
    await createTask(newTask);
    getTasks();
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };
  const handleUpdateTask = async(updatedArticle) => {
    const allArticles = tasks.articles;
    const article = allArticles.find(article => article.id === updatedArticle.id);
    if (article) {
      await updateTask(article.id, updatedArticle);
      getTasks();
      setIsDetailModalOpen(false);
    }
  };

  return (
    <div className={styles.board}>
      <div className={styles.createTaskButton}>
        <button onClick={() => setIsModalOpen(true)} className={styles.button}>新しい記事を作成</button>
      </div>
      <div className={styles.columns}>
        <Column name="記事一覧" tasks={tasks.articles} categories={tasks.categories} onCardClick={handleCardClick} />
      </div>
      <TaskModal
        categories={tasks.categories}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleAddTask}
      />
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        task={selectedTask}
        categories={tasks.categories}
        onClose={() => setIsDetailModalOpen(false)}
        onUpdate={handleUpdateTask}
        onFetch={getTasks}
      />
    </div>
  );
};
export default Board;