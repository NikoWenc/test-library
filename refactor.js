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

function createElement (tag) {
    const element = document.createElement(tag);
    return element;
}

class Book {
    constructor(title, author, pages){
        this.isRead = false;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = crypto.randomUUID();
    }

    toggleReadStatus(){
        this.isRead = this.isRead ? false : true;
    }
}

class BookEntry {

    constructor(book) {
        this.book = book
        this.newDiv = createElement('div');
        this.bookTitle = createElement('h2');
        this.bookAuthor = createElement('p');
        this.bookPages = createElement('p');
        this.bookStatus = createElement('p');
        this.buttonsDiv = createElement('div');
        this.readButton = createElement('button');
        this.delButton = createElement('button');

        // change status when done reading
        this.readButton.addEventListener('click', () => this.updateBookReadStatus())

        // delete the entry
        this.delButton.addEventListener('click', () => {
            this.deleteEntry();
            this.deleteEntryFromLibrary();    
        });

        this.updateBookEntryContents();
    }

    updateBookEntryContents(){
        this.newDiv.classList.add('center');
        this.bookTitle.textContent = `Book Title: ${this.book.title}`;
        this.bookAuthor.textContent = `Book Author: ${this.book.author}`;
        this.bookPages.textContent = `Number of Pages: ${this.book.pages}`;
        this.bookStatus.textContent = this.book.isRead ? 'Finished' : 'Not yet Read';
        this.bookStatus.style.color = this.book.isRead ? 'green' : 'white';
        this.buttonsDiv.classList.add('buttonsDiv');
        this.readButton.textContent = this.book.isRead ? 'Undone' : 'Done';
        this.readButton.classList.add('doneBTN');
        this.delButton.textContent = 'Delete';
        this.delButton.classList.add('delBTN');
    }
    
    updateBookReadStatus(){
        this.book.toggleReadStatus();
        this.updateBookEntryContents();
    }

    deleteEntry(){
        container.removeChild(this.newDiv)
    }

    deleteEntryFromLibrary(){
        const index = myLibrary.findIndex(elementIndex => elementIndex.id === this.book.id);
        if (index != -1) myLibrary.splice(index, 1);
    }

    append(){
        this.buttonsDiv.append(
            this.readButton, 
            this.delButton
        );
        this.newDiv.append(
            this.bookTitle, 
            this.bookAuthor, 
            this.bookPages, 
            this.bookStatus, 
            this.buttonsDiv,
        );

        return this.newDiv;
    }
}

// prevent form default submit
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const {formTitle, formAuthor, formPages} = form.elements;
    let newBook = new Book(formTitle.value, formAuthor.value, formPages.value);
    myLibrary.push(newBook);
    let bookEntry = new BookEntry(newBook);
    container.appendChild(bookEntry.append());

    form.reset();
    dialog.close();
})