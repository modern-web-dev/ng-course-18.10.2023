// export interface BookProperties {
//   author: Author;
//   title: string;
// }
//
// export  type Book = BookProperties & { id: number; }
//
// export interface Book2 extends BookProperties {
//   id: number;
// }

export interface Book {
  id: number;
  author: Author;
  title: string;
}
export type NewBook = Omit<Book, 'id'>;

interface Author {
  firstName: string;
  lastName: string;
}
