export interface TableProps {
  data: [];
}

export interface Author {
  id: number;
  name: string;
}

export interface TargetChange {
  name: string;
  value: string;
}

export interface TableAuthor {
  id: number;
  name: string;
  birth: Date;
  bio: string;
  dataBooks: [{ id: number; name: string }];
}

export interface TableAuthorProps {
  authors: TableAuthor[];
}
