"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server.ts
var server_exports = {};
__export(server_exports, {
  filePath: () => filePath,
  outputFilePath: () => outputFilePath,
  processFile: () => processFile
});
module.exports = __toCommonJS(server_exports);
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_lodash = require("lodash");
var filePath = import_path.default.join(__dirname, "stubs/hello.stub");
var outputFilePath = import_path.default.join(__dirname, "output/hello.html");
function processFile() {
  import_fs.default.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.error("File not found:", err.path);
      } else {
        console.error("Error reading file:", err);
      }
      return;
    }
    const updatedText = (0, import_lodash.template)(data)({ user: "Abhiyan" });
    import_fs.default.writeFileSync(outputFilePath, updatedText);
  });
}
processFile();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  filePath,
  outputFilePath,
  processFile
});
