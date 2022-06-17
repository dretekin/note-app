import fs from "fs";
import { createRequire } from "module";
import { argv } from "process";
const require = createRequire(import.meta.url);
const validator = require("validator");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
// const argv = yargs(hideBin(process.argv)).argv
// const notes = require('./notes.js')
import notes from "./notes.js";

// ////////////////////////////////
// ////////////////////////////////
// Here is where user interraction take place
// ////////////////////////////////
yargs(hideBin(process.argv))
  .command(
    "add",
    "add note",
    {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Note body",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => {
      notes.addNote(argv.title, argv.body);
    }
  )
  .command(
    "remove",
    "remove note",
    {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => {
      notes.removeNote(argv.title);
    }
  )
  .command(
    "read",
    "read note",
    {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },
    () => {
      notes.readNote(argv.title);
    }
  )
  .command(
    "list",
    "list note",
    {
      title: {
        describe: "List notes",
      },
    },
    () => {
      notes.listNote();
    }
  )
  .demandCommand(1)
  .parse();
