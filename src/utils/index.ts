import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export const mkdir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    mkdir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
};

export const getProjectRoot = () => {
  const { workspace, window } = vscode;
  if (window.activeTextEditor) {
    const activeWorkspace = workspace.getWorkspaceFolder(
      window.activeTextEditor?.document.uri!
    );
    return activeWorkspace?.uri.fsPath || "";
  }
  return (workspace.workspaceFolders as any)[0].uri.path; // 第一个workspace根路径
};

export const getFileRoot = () => {
  const { workspace, window } = vscode;
  if (window.activeTextEditor) {
    let fileName = window.activeTextEditor?.document.fileName;
    var pathArr = fileName.split("/");
    pathArr.pop();
    return pathArr.join("/");
  }
  return (workspace.workspaceFolders as any)[0].uri.path; // 第一个workspace根路径
};
