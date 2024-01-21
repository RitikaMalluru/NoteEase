body {
  font-family: Arial, sans-serif;
  margin: 10px;
}

#notes-container {
  max-width: 300px;
}

#note-input {
  width: 100%;
  margin-bottom: 10px;
  color: black; /* Default text color in the text area */
}

#save-button {
  width: 100%;
  padding: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

#notes-list {
  list-style-type: none;
  padding: 0;
}

.note-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  border: 1px solid #e0e0e0;
  margin-bottom: 5px;
  cursor: pointer;
  color: black; /* Default text color for saved notes */
}

.note-item:hover {
  background-color: #f0f0f0;
}

/* Colors for different parts of the text */
.red-text {
  color: red;
}

.blue-text {
  color: blue;
}

.green-text {
  color: green;
}

.purple-text {
  color: purple;
}

button {
  margin-left: 5px;
  padding: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #dddddd;
}
