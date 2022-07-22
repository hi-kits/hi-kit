const fs = require("fs");
const path = require("path");

export function getPackagesInfoList(folderName, unHandleKey, callback) {
  const folder = path.resolve(folderName);
  const fileList = {};
  // const fileList = [];
  const dirContents = fs.readdirSync(folder).filter(item => !item.startsWith(unHandleKey));
  let count = 0;
  dirContents.forEach(function (file) {
    // 拼接url
    const fullPath = folder + "/" + file;
    const stats = fs.statSync(fullPath);
    // 如果是文件夹则需要存入到fileList中
    if (stats.isDirectory()) {
      // 将文件夹的名称保存起来
      fileList[file] = folderName + file + "/index.ts";
    }
    // 所有的文件遍历结束后，调用callback
    ++count == dirContents.length && callback();
  });
  //为空时直接回调
  dirContents.length === 0 && callback();
  return fileList;
}
