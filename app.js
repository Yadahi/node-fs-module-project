const fs = require("fs/promises");
import { createFile, deleteFile, renameFile, addToFile } from "./helpers";

// Commands
const CREATE_FILE = "create a file";
const DELETE_FILE = "delete a file";
const RENAME_FILE = "rename a file to file";
const ADD_TO_FILE = "add the file";

(async () => {
  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    // get the size of the file
    const size = (await commandFileHandler.stat()).size;
    // allocate our buffer with the size of the file
    const buff = Buffer.alloc(size);
    // the location at which we want to start filling our buffer
    const offset = 0;
    // how manu bytes we want to read
    const length = buff.byteLength;
    // the position that we want to start reading the file from
    const position = 0;

    // we always want to read the whole content (from beginning all the way to the end)
    await commandFileHandler.read(buff, offset, length, position);
    // decoder
    const command = buff.toString("utf-8");

    // create a file:
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // delete a file
    // delete the file path
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename file
    if (command.includes(RENAME_FILE)) {
      const index = command.indexOf(" to ");
      const oldFilePath = command.substring(RENAME_FILE.length + 1, index);
      const newFilePath = command.substring(index + 4);

      renameFile(oldFilePath, newFilePath);
    }

    if (command.includes(ADD_TO_FILE)) {
    }
  });

  //   Watcher
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      // emitting a change handler
      commandFileHandler.emit("change");
    }
  }
})();
