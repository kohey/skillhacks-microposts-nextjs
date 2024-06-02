import React, { useState, useEffect } from 'react';
import Column from './Column';
import TaskModal from './TaskModal';
import TaskDetailModal from './TaskDetailModal';
import { fetchArticles, createTask, updateTask } from '../api/tasks';
import { fetchCategories } from '../api/categories';
import { Container, Grid, Button, Box, AppBar, Toolbar, Typography } from '@mui/material';
import styles from '../styles/Board.module.css';

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

  const handleAddTask = async (newTask) => {
    await createTask(newTask);
    getTasks();
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleUpdateTask = async (updatedArticle) => {
    const allArticles = tasks.articles;
    const article = allArticles.find(article => article.id === updatedArticle.id);
    if (article) {
      await updateTask(article.id, updatedArticle);
      getTasks();
      setIsDetailModalOpen(false);
    }
  };

  return (
    <div>
      <AppBar position="static" className={styles.header}>
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" className={styles.title}>
            掲示板
          </Typography>
          <Button
            variant="contained"
            className={styles.postButton}
            onClick={() => setIsModalOpen(true)}
          >
            投稿する
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className={styles.container}>
        <Grid container spacing={3}>
          {tasks.articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Column task={article} onCardClick={handleCardClick} />
            </Grid>
          ))}
        </Grid>
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
      </Container>
    </div>
  );
};

export default Board;
