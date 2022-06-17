import fs from "fs";
import chalk from "chalk";
import { Console } from "console";
import { title } from "process";

// Processing of user data takes place here

function getNotes() {
  return "Your notes...";
}

function addNote(title, body) {
  const notes = loadNote();

  const duplicateNote = notes.find(function (note) {
    return note.title == title;
  });

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note added!"));
  } else console.log(chalk.red.inverse("Oops, Note title taken"));
}

function saveNotes(notes) {
  fs.writeFileSync("./notes.json", JSON.stringify(notes));
}

function loadNote() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

function removeNote(title, cmdStatus) {
  const notes = loadNote();

  const notesToKeep = notes.filter(function (note) {
    return note.title !== title;
  });

  if (notes.length === notesToKeep.length) {
    console.log(chalk.red.inverse("No note found!"));
  } else {
    console.log(chalk.green.inverse("Note removed!"));
  }

  saveNotes(notesToKeep);
}

function listNote() {
  console.log(chalk.green.underline("List of Notes"));
  loadNote().forEach((note) => {
    console.log(chalk.white.bold(`${note.title}`));
  });
}

function readNote(title) {
  const notes = loadNote();

  const noteFound = notes.find(function (note) {
    return note.title === title;
  });

  if (noteFound) {
    console.log(chalk.inverse(noteFound.title), noteFound.body);
  } else console.log(chalk.red("No note found!"));
}

export default {
  addNote: addNote,
  removeNote: removeNote,
  listNote: listNote,
  readNote: readNote,
};
