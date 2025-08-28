const container = document.querySelector('.container');
const addBook = document.querySelector('.button');
const form = document.querySelector('form');
const dialog = document.querySelector('dialog');
const closeBTN = document.querySelector('#closeBTN');

const myLibrary = [];

// add book details button
addBook.addEventListener('click', () => dialog.showModal());

// close button for dialog
closeBTN.addEventListener('click', (event) => {
    dialog.close();
    event.preventDefault()
});

function createElement (tag, text, classList) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (classList) element.classList.add(classList);
    return element;
}

class BookEntry {

    constructor(book) {
        this.newDiv = createElement('div', false, 'center');
        this.bookTitle = createElement('h2', `Book Title: ${book.title}`);
        this.bookAuthor = createElement('p', `Book Author: ${book.author}`);
        this.bookPages = createElement('p', `Number of Pages: ${book.pages}`);
        this.bookStatus = createElement('p', book.status);
        this.buttonsDiv = createElement('div', false, 'buttonsDiv');
        this.readButton = createElement('button', 'Done', 'doneBTN');
        this.delButton = createElement('button', 'Delete', 'delBTN');

        // change status when done reading
        readButton.addEventListener('click', () => {
            book.doneRead();
            bookStatus.textContent = book.status;
            bookStatus.style.color = 'green';
        })

        // delete the entry
        delButton.addEventListener('click', () => {
            container.removeChild(newDiv)
            const index = myLibrary.findIndex(elementIndex => elementIndex.id === book.id);
            if (index != -1) myLibrary.splice(index, 1);
        });
    }

    append(){
        buttonsDiv.append(
            readButton, 
            delButton
        );
        return newDiv.append(
            bookTitle, 
            bookAuthor, 
            bookPages, 
            bookStatus, 
            buttonsDiv,
        );
    }
    

}

const bookEntry = new BookEntry();

// prevent form default submit
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const {formTitle, formAuthor, formPages} = form.elements;
    let newBook = Book(formTitle.value, formAuthor.value, formPages.value);
    myLibrary.push(newBook);
    container.appendChild(bookEntry(newBook));

    dialog.close();
})

class Book {
    constructor(title, author, pages){
        this.status = 'not read yet';
        this.title;
        this.author;
        this.pages;
        this.id = rypto.randomUUID();
    }

    doneRead(){
        return this.status = 'Finished';
    }

    info(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;
    }
}