import fs from "fs"
import path from "path"
import { template } from "lodash"

export const filePath = path.join(__dirname, "stubs/hello.stub")
export const outputFilePath = path.join(__dirname, "output/hello.html")

export function processFile() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.error("File not found:", err.path)
      } else {
        console.error("Error reading file:", err)
      }
      return
    }
    const updatedText = template(data)({ user: "Abhiyan" })
    fs.writeFileSync(outputFilePath, updatedText)
  })
}
processFile()
