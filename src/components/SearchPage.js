import React from 'react'
import Book from './Book';
import {Link} from 'react-router-dom';
const SearchPage = ({onSearch,result,onBookSelect,value}) =>{
    return (
        <div className="search-books">
            <div className="search-books-bar">
                    <Link className="close-search" to ="/"></Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" value={value} onChange = {(event)=>onSearch(event)} placeholder="Search by title or author"/>
                </div>
            </div>
            <div className="search-books-results">
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {result&&result.length?
                        result.map((book,index)=><Book book={book} onShelfChange={onBookSelect} key={index} />):'' }
                    </ol>
                </div>
            </div>
        </div>
    )
}
export default SearchPage;