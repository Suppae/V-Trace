"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const tagParser_1 = require("./parser/tagParser");
const graphBuilder_1 = require("./graph/graphBuilder");
const graphStore_1 = require("./graph/graphStore");
function activate(context) {
    console.log('V-Trace ativado');
    const store = new graphStore_1.GraphStore();
    const refreshCommand = vscode.commands.registerCommand('vtrace.refresh', async () => {
        const matches = await (0, tagParser_1.scanWorkspace)();
        const graph = (0, graphBuilder_1.buildGraph)(matches);
        store.update(graph);
        vscode.window.showInformationMessage(`V-Trace: ${graph.requirements.size} requisitos, ` +
            `${graph.orphanTests.length} testes órfãos, ` +
            `${graph.duplicateReqIds.length} IDs duplicados`);
        console.log(graph);
    });
    const openViewCommand = vscode.commands.registerCommand('vtrace.openView', () => {
        vscode.window.showInformationMessage('V-Trace: abrir vista (ainda por implementar)');
    });
    context.subscriptions.push(refreshCommand, openViewCommand);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map