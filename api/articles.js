// NOTE: バックエンドのurlを指定すること
const base = 'https://sturdy-space-couscous-x59w7grwrg5rhvp45-3000.app.github.dev'

export const fetchArticles = async () => {
    return await fetch(`${base}/api/v1/articles`).then(response => response.json())
};

export const createarticle = async (article) => {
    const response = await fetch(`${base}/api/v1/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article: article }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  export const updatearticle = async (id, updatedarticle) => {
    const response = await fetch(`${base}/api/v1/articles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedarticle),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  export const deletearticle = async (id) => {
    await fetch(`${base}/api/v1/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };