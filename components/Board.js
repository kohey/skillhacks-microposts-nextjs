import React, { useState, useEffect } from 'react';
import Column from './Column';
import ArticleModal from './ArticleModal';
import ArticleDetailModal from './ArticleDetailModal';
import { fetchArticles, createarticle, updatearticle } from '../api/articles';
import { fetchCategories } from '../api/categories';
import { Container, Grid, Button, Box, AppBar, Toolbar, Typography } from '@mui/material';
import styles from '../styles/Board.module.css';

const Board = () => {
  const [articles, setarticles] = useState({
    articles: [],
    categories: [],
  });

  const getarticles = async () => {
    const fetchedArticles = await fetchArticles();
    const fetchedCategories = await fetchCategories();

    setarticles({
      articles: fetchedArticles,
      categories: fetchedCategories,
    });
  };

  useEffect(() => {
    getarticles();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedarticle, setSelectedarticle] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleAddarticle = async (newarticle) => {
    await createarticle(newarticle);
    getarticles();
  };

  const handleCardClick = (article) => {
    setSelectedarticle(article);
    setIsDetailModalOpen(true);
  };

  const handleUpdatearticle = async (updatedArticle) => {
    const allArticles = articles.articles;
    const article = allArticles.find(article => article.id === updatedArticle.id);
    if (article) {
      await updatearticle(article.id, updatedArticle);
      getarticles();
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
          {articles.articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Column article={article} onCardClick={handleCardClick} />
            </Grid>
          ))}
        </Grid>
        <ArticleModal
          categories={articles.categories}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleAddarticle}
        />
        <ArticleDetailModal
          isOpen={isDetailModalOpen}
          article={selectedarticle}
          categories={articles.categories}
          onClose={() => setIsDetailModalOpen(false)}
          onUpdate={handleUpdatearticle}
          onFetch={getarticles}
        />
      </Container>
    </div>
  );
};

export default Board;
