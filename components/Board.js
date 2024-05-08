import React, { useState, useEffect } from 'react';
import Column from './Column';
import TaskModal from './TaskModal';
import TaskDetailModal from './TaskDetailModal';
import styles from '../styles/Board.module.css';
import { fetchTasks, createTask, updateTask  } from '../api/tasks';

const Board = () => {
  const [tasks, setTasks] = useState({
    pending: [],
    inProgress: [],
    completed: [],
  });
  const getTasks = async () => {
    const fetchedTasks = await fetchTasks();
    setTasks({
      pending: fetchedTasks.pending,
      inProgress: fetchedTasks.in_progress,
      completed: fetchedTasks.completed,
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
  const handleUpdateTask = async(updatedTask) => {
    const allTasks = [...tasks.pending, ...tasks.inProgress, ...tasks.completed];
    const task = allTasks.find(task => task.id === updatedTask.id);
    if (task) {
      await updateTask(task.id, updatedTask);
      getTasks();
      setIsDetailModalOpen(false);
    }
  };

  return (
    <div className={styles.board}>
      <div className={styles.createTaskButton}>
        <button onClick={() => setIsModalOpen(true)} className={styles.button}>新しいタスクを作成</button>
      </div>
      <div className={styles.columns}>
        <Column name="保留中" tasks={tasks.pending} onCardClick={handleCardClick} />
        <Column name="進行中" tasks={tasks.inProgress} onCardClick={handleCardClick} />
        <Column name="完了" tasks={tasks.completed} onCardClick={handleCardClick} />
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
        onFetch={getTasks}
      />
    </div>
  );
};
export default Board;