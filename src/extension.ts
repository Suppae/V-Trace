import * as vscode from 'vscode';
import { scanWorkspace } from './parser/tagParser';
import { buildGraph } from './graph/graphBuilder';
import { GraphStore } from './graph/graphStore';

export function activate(context: vscode.ExtensionContext) {
  console.log('V-Trace ativado');
  const store = new GraphStore();

  const refreshCommand = vscode.commands.registerCommand('vtrace.refresh', async () => {
    const matches = await scanWorkspace();
    const graph = buildGraph(matches);
    store.update(graph);

    vscode.window.showInformationMessage(
      `V-Trace: ${graph.requirements.size} requisitos, ` +
      `${graph.orphanTests.length} testes órfãos, ` +
      `${graph.duplicateReqIds.length} IDs duplicados`
    );
    console.log(graph);
  });

  const openViewCommand = vscode.commands.registerCommand('vtrace.openView', () => {
    vscode.window.showInformationMessage('V-Trace: abrir vista (ainda por implementar)');
  });

  context.subscriptions.push(refreshCommand, openViewCommand);
}

export function deactivate() {}