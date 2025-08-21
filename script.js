const container = document.querySelector('.container');
const addBook = document.querySelector('.button');
const newDiv = document.createElement('div');
const bookAuthor = document.createElement('p');
const bookPages = document.createElement('p');
const bookTitle = document.createElement('h2');


const myLibrary = [];

// add book details button
addBook.addEventListener('click', () => {
    let title = prompt('Enter tittle:');
    let author = prompt('Enter author:');
    let pages = prompt('how many pages?');
    addToLibrary(new Book(title, author, pages))

    bookTitle.textContent = `Book Title: ${title}`;
    bookAuthor.textContent = `Book Author: ${author}`;
    bookPages.textContent = `Number of Pages: ${pages}`;
    newDiv.appendChild(bookTitle);
    newDiv.appendChild(bookAuthor);
    newDiv.appendChild(bookPages);
    container.appendChild(newDiv);
})


function Book (tittle, author, pages) {
    if (!new.target){
        // log this error if 'new' operator is not called
        throw Error("You must use the 'new' operator to call the constructor")
        
    }
    this.tittle = tittle;
    this.author = author;
    this.pages = pages;
    this.read = 'not read yet';
    this.info = () => `${this.tittle} by ${this.author}, ${this.pages} pages, ${this.read}`;
    this.id = crypto.randomUUID();
}

function addToLibrary (book) {
    myLibrary.push(book);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295);

