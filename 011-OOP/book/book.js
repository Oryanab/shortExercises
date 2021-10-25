"use strict";

class Book {
  constructor(title, genre, author, read, readDate) {
    (this.title = title),
      (this.genre = genre),
      (this.author = author),
      (this.read = read),
      (this.readDate = readDate);
  }
}

class BookList {
  constructor(wasRead, unread, nextBook, currentBook, previousBook, allBooks) {
    (this.currentBook = currentBook),
      (this.previousBook = previousBook),
      (this.nextBook = nextBook),
      (this.wasRead = wasRead),
      (this.unread = unread),
      (this.allBooks = allBooks);
  }

  add(bookJson) {
    if (!this.allBooks.includes(bookJson)) {
      this.allBooks.push(bookJson);
    }
    return new BookList(
      this.currentBook,
      this.previousBook,
      this.nextBook,
      this.wasRead,
      this.unread,
      this.allBooks
    );
  }
  finishCurrentBook() {
    const currentBook = this.currentBook;
    currentBook.wasRead === true;
    currentBook.readDate === new Date(Date.now());
    this.wasRead++;
    this.unread--;
    this.previousBook = currentBook;
    this.currentBook = this.nextBook;
    for (let book of this.allBooks) {
      if (book.wasRead === false) {
        this.nextBook = book;
      }
    }
  }
}

//new book(title, genre, author, read, new Date(Date.now()))

const book1 = new Book("m", "genre", "author", false, new Date(Date.now()));
const book2 = new Book("k", "genre", "author", true, new Date(Date.now()));
const book3 = new Book("b", "genre", "author", false, new Date(Date.now()));

const allbooks = [book1, book2];
let booklist = new BookList(1, 5, "book1", "book2", undefined, allbooks);
booklist.add(book3);
booklist.finishCurrentBook();
console.log(booklist);
/*
.finishCurrentBook()
    should mark the book that is currently being read as "read"
    Give it a read date of new Date(Date.now())
    Change the last book read to be the book that just got finished
    Change the current book to be the next book to be read
    Change the next book to be read property to be the first unread book you find in the list of books
*/
