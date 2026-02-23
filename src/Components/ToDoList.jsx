import { useMemo, useState } from "react";
import TaskItem from "./TaskItems.jsx";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // UI state (mantığı bozmaz)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openPanel, setOpenPanel] = useState(null); // "important" | "completed" | null

  const addTask = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      text: trimmed,
      important: false,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setText("");
  };

  const toggleCompleted = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleImportant = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, important: !t.important } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  
  const importantTasks = useMemo(() => tasks.filter((t) => t.important), [tasks]);
  const completedTasks = useMemo(() => tasks.filter((t) => t.completed), [tasks]);

  const togglePanel = (panelName) => {
    setOpenPanel((prev) => (prev === panelName ? null : panelName));
    if (!isSidebarOpen) setIsSidebarOpen(true);
  };

  return (
    <div className="page">
      {/* TOP BAR */}
      <header className="topbar">
        <div className="brand">
          <div className="logoDot" />
          <div>
            <div className="brandTitle">TODO LİST</div>
            <div className="brandSub">Basit motor, modern kaporta</div>
          </div>
        </div>

        <button
          className="iconBtn"
          onClick={() => setIsSidebarOpen((s) => !s)}
          aria-label="Sidebar aç/kapat"
          title="Sidebar"
        >
          ☰
        </button>
      </header>

      {/* MAIN LAYOUT */}
      <div className="layout">
        {/* MAIN CONTENT */}
        <main className="main">
          <h1 className="heroTitle">Görevler</h1>

          {/* ADD */}
          <form className="addForm" onSubmit={addTask}>
            <input
              className="textInput"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Yeni görev yaz…"
            />
            <button className="primaryBtn" type="submit">
              Ekle
            </button>
          </form>

          {/* STATS (küçük kartlar) */}
          <section className="statsRow">
            <button className="statCard" type="button" onClick={() => togglePanel("important")}>
              <div className="statLabel">Important</div>
              <div className="statValue">{importantTasks.length}</div>
              <div className="statHint">Sağ panelde göster</div>
            </button>

            <button className="statCard" type="button" onClick={() => togglePanel("completed")}>
              <div className="statLabel">Completed</div>
              <div className="statValue">{completedTasks.length}</div>
              <div className="statHint">Sağ panelde göster</div>
            </button>

            <div className="statCard statCardStatic">
              <div className="statLabel">All</div>
              <div className="statValue">{tasks.length}</div>
              <div className="statHint">Ana listede</div>
            </div>
          </section>

          {/* ALL TASKS LIST */}
          <section className="card">
            <div className="cardHeader">
              <div className="cardTitle">All Tasks</div>
              <div className="cardSub">
                Yıldız = important, checkbox = completed
              </div>
            </div>

            {tasks.length === 0 ? (
              <div className="empty">
                Henüz görev yok. Yukarıdan bir tane ekle 🙂
              </div>
            ) : (
              <div className="list">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleCompleted={toggleCompleted}
                    onToggleImportant={toggleImportant}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            )}
          </section>
        </main>

     
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <div className="sidebarHeader">
            <div className="sidebarTitle">Paneller</div>
            <button className="ghostBtn" onClick={() => setIsSidebarOpen(false)}>
              Kapat
            </button>
          </div>

          

          <div className="panel">
            <button className="panelBtn" onClick={() => togglePanel("important")}>
              <span>Important</span>
              <span className="pill">{importantTasks.length}</span>
              <span className="chev">{openPanel === "important" ? "▾" : "▸"}</span>
            </button>

            {openPanel === "important" && (
              <div className="panelBody">
                {importantTasks.length === 0 ? (
                  <div className="miniEmpty">Important görev yok.</div>
                ) : (
                  importantTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleCompleted={toggleCompleted}
                      onToggleImportant={toggleImportant}
                      onDelete={deleteTask}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          
          <div className="panel">
            <button className="panelBtn" onClick={() => togglePanel("completed")}>
              <span>Completed</span>
              <span className="pill">{completedTasks.length}</span>
              <span className="chev">{openPanel === "completed" ? "▾" : "▸"}</span>
            </button>

            {openPanel === "completed" && (
              <div className="panelBody">
                {completedTasks.length === 0 ? (
                  <div className="miniEmpty">Completed görev yok.</div>
                ) : (
                  completedTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleCompleted={toggleCompleted}
                      onToggleImportant={toggleImportant}
                      onDelete={deleteTask}
                    />
                  ))
                )}
              </div>
            )}
          </div>

         
        </aside>
      </div>
    </div>
  );
}

export default ToDoList;