// src/graph/graphBuilder.ts
import { TagMatch, ReqNode } from '../parser/types';

export interface GraphResult {
  requirements: Map<string, ReqNode>;
  orphanTests: TagMatch[];        // testes que apontam para um @req inexistente
  duplicateReqIds: string[];      // IDs de requisito declarados mais de uma vez
}

export function buildGraph(matches: TagMatch[]): GraphResult {
  const requirements = new Map<string, ReqNode>();
  const duplicateReqIds: string[] = [];
  const orphanTests: TagMatch[] = [];

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
    } else {
      orphanTests.push(m); // aponta para um @req que não existe
    }
  }

  return { requirements, orphanTests, duplicateReqIds };
}