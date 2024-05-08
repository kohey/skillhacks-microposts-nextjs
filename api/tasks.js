export const fetchTasks = async () => {
    return await fetch('https://effective-enigma-69v6x7j6rqgv246q4-4567.app.github.dev/api/v1/tasks').then(response => response.json())
};