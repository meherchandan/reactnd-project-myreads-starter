import React from 'react'
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom';
const Dashboard = ({books,onShelfChange}) => {
    const currentlyReading = books.filter(book=>book.shelf==="currentlyReading");
    const wantToRead = books.filter(book=>book.shelf==="wantToRead");
    const read = books.filter(book=>book.shelf==="read");
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf shelfTitle = "Currently Reading" onShelfChange={onShelfChange} shelfBooks={currentlyReading}/>
                    <BookShelf shelfTitle = "Want to Read" onShelfChange={onShelfChange}  shelfBooks={wantToRead}/>
                    <BookShelf shelfTitle = "Read" onShelfChange={onShelfChange}  shelfBooks={read}/>
                </div>
            </div>
            <div className="open-search">
                <Link className = "open-search-link" to="/search">Add a book</Link>
            </div>
        </div>
    )
}
export default Dashboard;
