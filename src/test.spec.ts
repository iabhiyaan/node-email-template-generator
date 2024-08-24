import { describe, it, expect, vi } from "vitest"
import fs from "fs"
import { processFile, filePath, outputFilePath } from "./server"

describe("File Processing", () => {
  it("should read the file, process it with template, and write the output file", () => {
    const mockReadFile = vi
      .spyOn(fs, "readFile")
      .mockImplementation((path, encoding, callback) => {
        callback(null, "Hello, <%= user %>!")
      })

    const mockWriteFileSync = vi
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {})

    processFile()

    expect(mockReadFile).toHaveBeenCalledWith(
      filePath,
      "utf8",
      expect.any(Function),
    )
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      outputFilePath,
      "Hello, Abhiyan!",
    )
  })

  it("should handle file not found error", () => {
    vi.spyOn(fs, "readFile").mockImplementation((path, encoding, callback) => {
      callback({ code: "ENOENT", path }, null)
    })

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {})

    processFile()

    expect(consoleErrorSpy).toHaveBeenCalledWith("File not found:", filePath)
  })

  it("should handle other file read errors", () => {
    vi.spyOn(fs, "readFile").mockImplementation((path, encoding, callback) => {
      callback(new Error("Some other error"), null)
    })

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {})

    processFile()

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error reading file:",
      new Error("Some other error"),
    )
  })
})
