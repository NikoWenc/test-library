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
        this.bookStatus = createElement('p', book.isRead ? 'Finished' : 'Not yet Read');
        this.buttonsDiv = createElement('div', false, 'buttonsDiv');
        this.readButton = createElement('button', 'Done', 'doneBTN');
        this.delButton = createElement('button', 'Delete', 'delBTN');

        // change status when done reading
        this.readButton.addEventListener('click', () => this.updateBookReadStatus(book))

        // delete the entry
        this.delButton.addEventListener('click', () => this.deleteEntry(book));
    }
    
    updateBookReadStatus(book){
        book.isRead ? book.undoRead(): book.doneRead();
        this.bookStatus.textContent = book.isRead ? 'Finished' : 'Not yet Read';
        this.bookStatus.style.color = book.isRead ? 'green' : 'white';
        this.readButton.textContent = book.isRead ? 'Undone' : 'Done';
    }

    deleteEntry(book){
        container.removeChild(this.newDiv)
        const index = myLibrary.findIndex(elementIndex => elementIndex.id === book.id);
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

    formTitle.value = '';
    formAuthor.value = '';
    formPages.value = '';
    dialog.close();
})

class Book {
    constructor(title, author, pages){
        this.isRead = false;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = crypto.randomUUID();
    }

    doneRead(){
        return this.isRead = true;
    }

    undoRead(){
        return this.isRead = false;
    }

    toggleRead(){
        return this.isRead ? true : false;
    }
}