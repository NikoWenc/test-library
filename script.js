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

// helper function to create DOM elements
function createElement (tag, text, classList) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (classList) element.classList.add(classList);
    return element;
}

// prevent form default submit
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const {formTitle, formAuthor, formPages} = form.elements;
    let newBook = Book(formTitle.value, formAuthor.value, formPages.value);
    myLibrary.push(newBook);

    const newDiv = createElement('div', false, 'center');
    const bookTitle = createElement('h2', `Book Title: ${formTitle.value}`);
    const bookAuthor = createElement('p', `Book Author: ${formAuthor.value}`)
    const bookPages = createElement('p', `Number of Pages: ${formPages.value}`);
    const bookStatus = createElement('p', newBook.status);
    const buttonsDiv = createElement('div', false, 'buttonsDiv');
    const readButton = createElement('button', 'Done', 'doneBTN')
    const delButton = createElement('button', 'Delete', 'delBTN');

    // change status when done reading
    readButton.addEventListener('click', () => {
        newBook.doneRead();
        bookStatus.textContent = newBook.status;
        bookStatus.style.color = 'green';
    })

    // delete the entry
    delButton.addEventListener('click', () => {
        container.removeChild(newDiv)
        const index = myLibrary.findIndex(elementIndex => elementIndex.id === newBook.id);
        if (index != -1) myLibrary.splice(index, 1);
    });

    newDiv.append(bookTitle, bookAuthor, bookPages, bookStatus, buttonsDiv);
    buttonsDiv.append(readButton, delButton);
    container.appendChild(newDiv);

    dialog.close();
})

function Book (title, author, pages) {
    let status = 'not read yet';
    const doneRead = () => status = 'Finished';
    const info = () => `${title} by ${author}, ${pages} pages, ${status}`;
    const id = crypto.randomUUID();
    return {title, author, pages, get status() { return status }, doneRead, info, id,}
}
