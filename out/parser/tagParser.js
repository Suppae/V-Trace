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
exports.parseFile = parseFile;
exports.scanWorkspace = scanWorkspace;
const vscode = __importStar(require("vscode"));
const REQ_REGEX = /@req:\s*([\w-]+)(?:\s+"([^"]+)")?/;
const TEST_REGEX = /@test-for:\s*([\w-]+)/;
function parseFile(document) {
    const matches = [];
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
async function scanWorkspace() {
    const files = await vscode.workspace.findFiles('**/*.{ts,js,py,java,c,cpp}', '**/node_modules/**');
    const all = [];
    for (const uri of files) {
        const doc = await vscode.workspace.openTextDocument(uri);
        all.push(...parseFile(doc));
    }
    return all;
}
//# sourceMappingURL=tagParser.js.map