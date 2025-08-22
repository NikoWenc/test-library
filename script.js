const container = document.querySelector('.container');
const addBook = document.querySelector('.button');
const form = document.querySelector('form');
const dialog = document.querySelector('dialog');
const closeBTN = document.querySelector('#closeBTN');

const myLibrary = [];

// add book details button
addBook.addEventListener('click', () => dialog.showModal())

// close button for dialog
closeBTN.addEventListener('click', (event) => {
    dialog.close();
    event.preventDefault()
})

// submit button for form - prevent form default submit
form.addEventListener('submit', (event) => {
    event.preventDefault();

    let title = form.bookTitle.value;
    let author = form.bookAuthor.value;
    let pages = form.bookPages.value;
    let newBook = book(title, author, pages);
    myLibrary.push(newBook);

    const newDiv = document.createElement('div');
    newDiv.className = 'center';
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookStatus = document.createElement('p');
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttonsDiv';
    const readButton = document.createElement('button');
    const delButton = document.createElement('button');

    // change status when done reading
    readButton.addEventListener('click', () => {
        bookStatus.textContent = 'Finished!';
        bookStatus.style.color = 'green';
    })

    // add button to delete the entry
    delButton.addEventListener('click', () => container.removeChild(newDiv))

    bookTitle.textContent = `Book Title: ${title}`;
    bookAuthor.textContent = `Book Author: ${author}`;
    bookPages.textContent = `Number of Pages: ${pages}`;
    bookStatus.textContent = newBook.read;
    readButton.textContent = `Done`;
    readButton.setAttribute('class', 'doneBTN');
    delButton.textContent = 'Delete';
    delButton.setAttribute('class', 'delBTN');

    // newDiv.appendChild(bookTitle);
    // newDiv.appendChild(bookAuthor);
    // newDiv.appendChild(bookPages);
    // newDiv.appendChild(bookStatus);
    // buttonsDiv.appendChild(readButton).setAttribute('class', 'doneBTN');
    // buttonsDiv.appendChild(delButton).setAttribute('class', 'delBTN');
    // newDiv.appendChild(buttonsDiv);
    // refactored above code to below code
    newDiv.append(bookTitle, bookAuthor, bookPages, bookStatus, buttonsDiv);
    buttonsDiv.append(readButton, delButton);
    container.appendChild(newDiv);

    dialog.close();
})

// function Book (title, author, pages) {
//     if (!new.target){
//         // log this error if 'new' operator is not called
//         throw Error("You must use the 'new' operator to call the constructor")
//     }
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = 'not read yet';
//     this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
//     this.id = crypto.randomUUID();
// }
// refactored above code to below code / changed to a factory function
function book (title, author, pages) {
    const read = 'not read yet';
    const info = function () {
        `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
    const id = crypto.randomUUID();
    return {title, author, pages, read, info, id,}
}

// function addToLibrary (book) {
//     myLibrary.push(book);
// }