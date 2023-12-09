export const createFile = async (path) => {
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

export const deleteFile = async (path) => {
  console.log("deleting file");
};

export const renameFile = async (path, newPath) => {
  console.log("renaming old path to new path");
};

export const addToFile = async (path, content) => {
  console.log("adding to this path");
};
