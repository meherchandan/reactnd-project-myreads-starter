import React from 'react';
import Book from './../Book';
const  BookShelf = ({shelfTitle, shelfBooks, onShelfChange})=> {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {shelfBooks.map((book,index)=><Book book={book} onShelfChange={onShelfChange} key={index} />)}
                </ol>
            </div>
        </div>
    )
}
export default BookShelf;
