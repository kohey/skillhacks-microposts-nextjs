import React, { useState } from 'react';
import Column from './Column';
import TaskModal from './TaskModal';
import TaskDetailModal from './TaskDetailModal';
import styles from '../styles/Board.module.css';
const Board = () => {
  const [tasks, setTasks] = useState({
    pending: [],
    inProgress: [],
    done: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); 

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      pending: [...prevTasks.pending, newTask],
    }));
  };
  const handleCardClick = (task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };
  const handleUpdateTask = (updatedTask) => {
    // updatedTaskを使ってタスクを更新する処理を書く
    // ここでは簡単のためにconsole.logを使っていますが、実際には状態を更新するコードを書くべきです
    console.log(updatedTask);
    setIsDetailModalOpen(false);
  };

  return (
    <div className={styles.board}>
      <div className={styles.createTaskButton}>
        <button onClick={() => setIsModalOpen(true)} className={styles.button}>新しいタスクを作成</button>
      </div>
      <div className={styles.columns}>
        <Column name="保留中" tasks={tasks.pending} onCardClick={handleCardClick} />
        <Column name="進行中" tasks={tasks.inProgress} onCardClick={handleCardClick} />
        <Column name="完了" tasks={tasks.done} onCardClick={handleCardClick} />
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleAddTask}
      />
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        task={selectedTask}
        onClose={() => setIsDetailModalOpen(false)}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
};
export default Board;