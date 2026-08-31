// src/graph/graphStore.ts
import * as vscode from 'vscode';
import { GraphResult } from './graphBuilder';

export class GraphStore {
  private _graph: GraphResult | undefined;
  private _onDidChange = new vscode.EventEmitter<GraphResult>();

  readonly onDidChange = this._onDidChange.event;

  get current(): GraphResult | undefined {
    return this._graph;
  }

  update(graph: GraphResult) {
    this._graph = graph;
    this._onDidChange.fire(graph);
  }
}