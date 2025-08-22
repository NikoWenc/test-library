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

// submit button for form - prevent form default submit
form.addEventListener('submit', (event) => {
    event.preventDefault();

    let title = form.bookTitle.value;
    let author = form.bookAuthor.value;
    let pages = form.bookPages.value;
    let newBook = Book(title, author, pages);
    myLibrary.push(newBook);
    console.log(newBook.info());

    const newDiv = createElement('div', false, 'center');
    const bookTitle = createElement('h2', `Book Title: ${title}`);
    const bookAuthor = createElement('p', `Book Author: ${author}`)
    const bookPages = createElement('p', `Number of Pages: ${pages}`);
    const bookStatus = createElement('p', newBook.read);
    const buttonsDiv = createElement('div', false, 'buttonsDiv');
    const readButton = createElement('button', 'Done', 'doneBTN')
    const delButton = createElement('button', 'Delete', 'delBTN');

    // change status when done reading
    readButton.addEventListener('click', () => {
        bookStatus.textContent = 'Finished!';
        bookStatus.style.color = 'green';
    })

    // add button to delete the entry
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
    const read = 'not read yet';
    const info = () => `${title} by ${author}, ${pages} pages, ${read}`;
    const id = crypto.randomUUID();
    return {title, author, pages, read, info, id,}
}
