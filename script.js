// QuickNotes keeps note data in JavaScript and builds the visible list from it.
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all-button");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const STORAGE_KEY = "quicknotes-notes";
const validCategories = ["Personal", "Work", "Study"];

let notes = loadNotes();

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (!Array.isArray(saved)) {
      return [];
    }

    return saved.filter((note) =>
      note &&
      typeof note.id === "string" &&
      typeof note.text === "string" &&
      validCategories.includes(note.category) &&
      typeof note.createdAt === "string"
    );
  } catch {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render() {
  notesList.replaceChildren();

  const query = searchInput.value.trim().toLocaleLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLocaleLowerCase().includes(query)
  );

  if (visibleNotes.length === 0 && query) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-message";
    emptyState.textContent = "No notes match your search.";
    notesList.append(emptyState);
  } else {
    visibleNotes.forEach((note) => {
      const card = document.createElement("li");
      card.classList.add(
        "note-card",
        `category-${note.category.toLowerCase()}`
      );

      const topLine = document.createElement("div");
      topLine.className = "note-topline";

      const category = document.createElement("span");
      category.className = "category-label";
      category.textContent = note.category;
      topLine.append(category);

      const text = document.createElement("p");
      text.className = "note-text";
      text.textContent = note.text;

      const bottomLine = document.createElement("div");
      bottomLine.className = "note-bottomline";

      const date = document.createElement("time");
      date.className = "note-date";
      date.dateTime = note.createdAt;
      date.textContent = new Date(note.createdAt).toLocaleString();

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute(
        "aria-label",
        `Delete note: ${note.text.slice(0, 40)}`
      );

      deleteButton.addEventListener("click", () => {
        notes = notes.filter((item) => item.id !== note.id);
        saveNotes();
        render();
      });

      bottomLine.append(date, deleteButton);
      card.append(topLine, text, bottomLine);
      notesList.append(card);
    });
  }

  updateCount();
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (!text) {
    errorMessage.textContent = "Please type a note first.";
    noteInput.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    noteInput.focus();
    return;
  }

  errorMessage.textContent = "";

  notes.unshift({
    id: crypto.randomUUID(),
    text,
    category: noteCategory.value,
    createdAt: new Date().toISOString(),
  });

  saveNotes();
  noteInput.value = "";
  render();
});

searchInput.addEventListener("input", render);

clearAllButton.addEventListener("click", () => {
  if (!notes.length || !window.confirm("Delete all notes?")) {
    return;
  }

  notes = [];
  saveNotes();
  render();
});

render();