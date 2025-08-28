
function globalAddEvent(element, action, func) {
    return element.addEventListener(action, func);
}

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