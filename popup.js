document.addEventListener('DOMContentLoaded', function () {
  const noteInput = document.getElementById('note-input');
  const saveButton = document.getElementById('save-button');
  const chatButton = document.getElementById('chat-button');
  const notesList = document.getElementById('notes-list');

  // Load existing notes on popup open
  loadNotes();

  // Save note when the save button is clicked
  saveButton.addEventListener('click', function () {
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
      saveNote(noteText);
      noteInput.value = '';
    }
  });

  // Redirect to ChatGPT when the chat button is clicked
  chatButton.addEventListener('click', function () {
    redirectToChatGPT();
  });

  // Load notes from storage
  function loadNotes() {
    chrome.storage.sync.get(['notes'], function (result) {
      const notes = result.notes || [];
      displayNotes(notes);
    });
  }

  // Save note to storage
  function saveNote(noteText) {
    chrome.storage.sync.get(['notes'], function (result) {
      const notes = result.notes || [];
      notes.push(noteText);
      chrome.storage.sync.set({ notes: notes }, function () {
        displayNotes(notes);
      });
    });
  }

  // Display notes on the popup
  function displayNotes(notes) {
    notesList.innerHTML = '';
    notes.forEach(function (note, index) {
      const listItem = createNoteListItem(note, index);
      notesList.appendChild(listItem);
    });
  }

  // Create a list item for a note
  function createNoteListItem(note, index) {
    const listItem = document.createElement('li');
    listItem.className = 'note-item';
    parseAndApplyColors(listItem, note);

    // Add "Edit" button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
      editNote(index, note);
    });

    // Add "Delete" button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      deleteNote(index);
    });

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
  }

  // Parse note content and apply colors
  function parseAndApplyColors(element, note) {
    const colorPatterns = {
      red: /red:([^;]*)/gi,
      blue: /blue:([^;]*)/gi,
      green: /green:([^;]*)/gi,
      purple: /purple:([^;]*)/gi,
    };

    let remainingText = note;

    Object.keys(colorPatterns).forEach(color => {
      const pattern = colorPatterns[color];
      const matches = remainingText.match(pattern);

      if (matches) {
        matches.forEach(match => {
          const text = match.replace(`${color}:`, '');
          const coloredSpan = document.createElement('span');
          coloredSpan.classList.add(`${color}-text`);
          coloredSpan.textContent = text;
          element.appendChild(coloredSpan);

          remainingText = remainingText.replace(match, '');
        });
      }
    });

    // Add the remaining text without color
    if (remainingText.trim() !== '') {
      const defaultSpan = document.createElement('span');
      defaultSpan.textContent = remainingText;
      element.appendChild(defaultSpan);
    }
  }

  // Edit a note
  function editNote(index, noteText) {
    const newNoteText = prompt('Edit your note:', noteText);
    if (newNoteText !== null) {
      chrome.storage.sync.get(['notes'], function (result) {
        const notes = result.notes || [];
        notes[index] = newNoteText;
        chrome.storage.sync.set({ notes: notes }, function () {
          displayNotes(notes);
        });
      });
    }
  }

  // Delete a note
  function deleteNote(index) {
    if (confirm('Are you sure you want to delete this note?')) {
      chrome.storage.sync.get(['notes'], function (result) {
        const notes = result.notes || [];
        notes.splice(index, 1);
        chrome.storage.sync.set({ notes: notes }, function () {
          displayNotes(notes);
        });
      });
    }
  }

  // Redirect to ChatGPT
  function redirectToChatGPT() {
    // Replace 'https://www.example.com/chatgpt' with the actual URL of the ChatGPT page
    const chatGPTURL = 'https://www.example.com/chatgpt';

    // Open a new tab or window with the ChatGPT page
    chrome.tabs.create({ url: chatGPTURL });
  }
});

