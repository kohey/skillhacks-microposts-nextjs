import React from 'react';
import Head from 'next/head';
import Board from '../components/Board';

const Home = () => (
  <div>
    <Head>
      <title>タスク管理</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Board />
    </main>

  </div>
);

export default Home;