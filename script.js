const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

async function optimizeTask(task) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an assistant that improves task descriptions." },
                { role: "user", content: `Improve this task text: "${task}"` }
            ],
            max_tokens: 50
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

addBtn.addEventListener('click', async () => {
    const task = input.value.trim();
    if (!task) return;
    const optimizedTask = await optimizeTask(task);
    const li = document.createElement('li');
    li.textContent = optimizedTask;
    todoList.appendChild(li);
    input.value = "";
});
