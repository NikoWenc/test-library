
class BookEntry {

    constructor(book) {
        const newDiv = createElement('div', false, 'center');
        const bookTitle = createElement('h2', `Book Title: ${book.title}`);
        const bookAuthor = createElement('p', `Book Author: ${book.author}`);
        const bookPages = createElement('p', `Number of Pages: ${book.pages}`);
        const bookStatus = createElement('p', book.status);
        const buttonsDiv = createElement('div', false, 'buttonsDiv');
        const readButton = createElement('button', 'Done', 'doneBTN');
        const delButton = createElement('button', 'Delete', 'delBTN');
    }

    // helper method to create DOM elements
    static createElement (tag, text, classList) {
        const element = document.createElement(tag);
        if (text) element.textContent = text;
        if (classList) element.classList.add(classList);
        return element;
    }


}