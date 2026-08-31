export type TagType = 'req' | 'test-for';

export interface TagMatch {
  type: TagType;
  id: string;
  description?: string;
  file: string;
  line: number;
}

export interface ReqNode {
  id: string;
  description?: string;
  location: TagMatch;
  tests: TagMatch[];
}