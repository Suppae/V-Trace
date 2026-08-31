"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildGraph = buildGraph;
function buildGraph(matches) {
    const requirements = new Map();
    const duplicateReqIds = [];
    const orphanTests = [];
    // 1ª passagem: registar requisitos
    for (const m of matches.filter(m => m.type === 'req')) {
        if (requirements.has(m.id)) {
            duplicateReqIds.push(m.id);
            continue; // mantém o primeiro, ignora repetições
        }
        requirements.set(m.id, {
            id: m.id,
            description: m.description,
            location: m,
            tests: [],
        });
    }
    // 2ª passagem: associar testes
    for (const m of matches.filter(m => m.type === 'test-for')) {
        const node = requirements.get(m.id);
        if (node) {
            node.tests.push(m);
        }
        else {
            orphanTests.push(m); // aponta para um @req que não existe
        }
    }
    return { requirements, orphanTests, duplicateReqIds };
}
//# sourceMappingURL=graphBuilder.js.map