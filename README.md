# quicknotes-app

Project 1: Build QuickNotes

# QuickNotes

QuickNotes is a small, responsive note-taking app for capturing short thoughts and organizing them into Personal, Work, or Study categories. Notes are saved in your browser, so they are still there when you return, and you can search, delete, or clear notes whenever you need to tidy up.

## Features

- Add notes with a Personal, Work, or Study category.
- Validate empty notes and limit note text to 200 characters.
- Search note text without case sensitivity.
- Delete an individual note or clear all notes after confirming.
- Save notes in browser local storage so they survive refreshes.
- View readable creation dates and an automatically updated note count.
- Use the layout on desktop or small screens.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern web browser. No build tools or dependencies are required.
3. Add a note, choose a category, and select **Add Note**. Your notes remain in that browser's local storage.

## What I learned

- Semantic HTML elements and correctly associated labels make a page easier to navigate and more accessible.
- CSS Flexbox and media queries help the same form adapt from a wide desktop layout to a narrow phone screen.
- JavaScript arrays and DOM methods can render interactive content safely with `textContent`.
- JSON and `localStorage` make it possible to keep small amounts of app data between visits.
