// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getPageTypes } from "./config";
import runScript from "./terminal/runScript";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "fecg" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("fecg.cg-page", (node) => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    let path = "";
    if (node) {
      path = node.path;
    } else {
      path = (vscode.workspace.workspaceFolders as any)[0].uri.path; // 文件夹根路径
    }
    vscode.window
      .showQuickPick(getPageTypes(), {
        canPickMany: false,
        ignoreFocusOut: true,
        placeHolder: "请选择需要生成的页面类型",
      })
      .then(function (type) {
        if (type) {
          createPage(type.split(":")[0], path);
        }
      });
  });

  context.subscriptions.push(disposable);
}
//
function createPage(type: string, path: string) {
  if (type === "openapi") { // openapi 不需要输入name
    runScript("fe-terminal", path!, `fe ${type}`);
    vscode.window.showInformationMessage("success");
    return;
  }
  vscode.window
    .showInputBox({
      ignoreFocusOut: true,
      placeHolder: "请输入名称", // 在输入框内的提示信息
      prompt: "用于文件名称、文件夹名称", // 在输入框下方的提示信息
    })
    .then(function (name) {
      if (!name) {
        name = "fe-pages";
      }
      runScript("fe-terminal", path!, `fe ${type} ${name}`);
      vscode.window.showInformationMessage("success");
    });
}

// this method is called when your extension is deactivated
export function deactivate() {}
