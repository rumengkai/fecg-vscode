import * as vscode from "vscode";
import { Terminal, TerminalOptions } from "vscode";
import { mkdir } from "../utils";
// 运行script命令
export default function runScript(
  terminalName: string,
  cwd: string,
  script: string
) {
  if (!script) {
    return;
  }
  mkdir(cwd);
  const { terminals } = vscode.window;
  let terminal: Terminal | undefined = terminals.find(({ name }) => {
    return name === terminalName;
  });
  if (!terminal) {
    const terminalOptions: TerminalOptions = { cwd, name: terminalName };
    terminal = vscode.window.createTerminal(terminalOptions);
  }
  try {
    terminal.show();
    terminal.sendText(`cd ${cwd}`);
    terminal.sendText(script);
    return true;
  } catch (error) {
    return error;
  }
}
