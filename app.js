const fs = require("fs/promises");

(async () => {
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      // the file was changeds
      console.log("the file was changed");
    }
  }
})();
