const fs = require("fs/promises");

const createFile = async (path) => {
  try {
    // we check if we already have the file
    const existingFileHandle = await fs.open(path, "r");
    //  we have the file
    existingFileHandle.close();
    return console.log(`the file ${path} already exists`);
  } catch (e) {
    // we dont have the file we should create it
    const newFileHandle = await fs.open(path, "w");
    console.log("a new file was successfully created");
    newFileHandle.close();
  }
};

const deleteFile = async (path) => {
  console.log("deleting file");
  try {
    await fs.unlink(path);
    console.log("The file was successfully deleted");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No file at this path to remove.");
    } else {
      console.log("An error occurred while removing the file: ");
      console.log(error);
    }
  }
};

const renameFile = async (path, newPath) => {
  console.log(`renaming ${path} to ${newPath}`);
  try {
    await fs.rename(path, newPath);
    console.log("The file was successfully renamed.");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        "No file at this path to rename, or the destination doesn't exist."
      );
    } else {
      console.log("An error occurred while renaming the file: ");
      console.log(error);
    }
  }
};

let addedContent;
const addToFile = async (path, content) => {
  console.log("adding to this path");
  if (addedContent === content) {
    return;
  }

  try {
    const fileHandle = await fs.open(path, "a");
    fileHandle.write(content);
    addedContent = content;
    console.log("The content was added successfully.");
  } catch (error) {
    console.log("An error occurred while removing the file: ");
    console.log(error);
  }
};

module.exports = { createFile, deleteFile, renameFile, addToFile };
