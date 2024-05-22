// NOTE: バックエンドのurlを指定すること
const base = 'https://sturdy-space-couscous-x59w7grwrg5rhvp45-3000.app.github.dev'

export const fetchCategories = async () => {
    return await fetch(`${base}/api/v1/categories`).then(response => response.json())
};
