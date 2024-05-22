// NOTE: バックエンドのurlを指定すること
const base = 'https://sturdy-space-couscous-x59w7grwrg5rhvp45-3000.app.github.dev'

export const fetchArticles = async () => {
    return await fetch(`${base}/api/v1/articles`).then(response => response.json())
};

export const createTask = async (task) => {
    const response = await fetch(`${base}/api/v1/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article: task }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  export const updateTask = async (id, updatedTask) => {
    const response = await fetch(`${base}/api/v1/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  export const deleteTask = async (id) => {
    await fetch(`${base}/api/v1/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };