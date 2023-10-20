export interface Book {
  id: number;
  author: Author;
  title: string;
}

interface Author {
  firstName: string;
  lastName: string;
}
