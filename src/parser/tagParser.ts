import * as vscode from 'vscode';
import { TagMatch } from './types';

const REQ_REGEX = /@req:\s*([\w-]+)(?:\s+"([^"]+)")?/;
const TEST_REGEX = /@test-for:\s*([\w-]+)/;

export function parseFile(document: vscode.TextDocument): TagMatch[] {
  const matches: TagMatch[] = [];
  for (let i = 0; i < document.lineCount; i++) {
    const line = document.lineAt(i).text;

    const reqMatch = line.match(REQ_REGEX);
    if (reqMatch) {
      matches.push({
        type: 'req',
        id: reqMatch[1],
        description: reqMatch[2],
        file: document.uri.fsPath,
        line: i,
      });
    }

    const testMatch = line.match(TEST_REGEX);
    if (testMatch) {
      matches.push({
        type: 'test-for',
        id: testMatch[1],
        file: document.uri.fsPath,
        line: i,
      });
    }
  }
  return matches;
}

export async function scanWorkspace(): Promise<TagMatch[]> {
  const files = await vscode.workspace.findFiles(
    '**/*.{ts,js,py,java,c,cpp}',
    '**/node_modules/**'
  );
  const all: TagMatch[] = [];
  for (const uri of files) {
    const doc = await vscode.workspace.openTextDocument(uri);
    all.push(...parseFile(doc));
  }
  return all;
}