import React from 'react';
import * as BooksAPI from './BooksAPI';
import Dashboard from './components/Dashboard';
import SearchPage from './components/SearchPage';
import {Route} from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[],
    searchResult:[],
    searchText:'',
    typing: false,
    typingTimeout: 0,
  }
  componentDidMount(){
    BooksAPI.getAll()
      .then(books=>this.setState({books}))
  }
  onShelfChange= (book,event)=>{
    const orgBooks = this.state.books;
    console.log(orgBooks);
    const finalBooks = orgBooks.map(b=>{
      if(b.id ===book.id){
        return {...b,shelf:event.target.value}
      }
        return b;
    })
    this.setState({books:finalBooks})
  }

  onSearch =(event)=>{
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
   }
   this.setState({searchText:event.target.value})

    this.typingTimeout = setTimeout(()=>{BooksAPI.search(this.state.searchText)
      .then(res=>{
        let searchBooks = res;
        for(let key in searchBooks){
          const dashboardBooks = this.state.books.filter(book=>book.id===searchBooks[key].id)
          if(dashboardBooks.length){
            searchBooks[key].shelf = dashboardBooks[0].shelf;
          }
        }
        this.setState({searchResult:searchBooks});
      })
      .catch(err=>this.setState({searchResult:[]}))},500);
  }
  onBookSelect =(book,event)=>{
    let selectedBook = this.state.searchResult.filter(b=>b.id ===book.id) ;
    let dashboardBooks = this.state.books.filter(b=>b.id ===book.id);
    selectedBook[0].shelf=event.target.value;
    if(!dashboardBooks.length){
      this.setState(prevState=>({books:[...prevState.books, ...selectedBook]}))
    }
    else{
      dashboardBooks[0].shelf = event.target.id;
      const RemainingBooks = this.state.books.filter(b=>b.id!==book.id)
      this.setState(prevState=>({books:[...RemainingBooks,...dashboardBooks]}));
    }
  }
  render() {
    return (
      <div className="app">
        <Route exact path = "/" render={()=>
          <Dashboard 
          books={this.state.books} 
          onShelfChange={this.onShelfChange} />} />
        <Route exact path = "/search" render={()=>
          <SearchPage 
          onBookSelect={this.onBookSelect} 
          value={this.state.searchText}
          onSearch={this.onSearch} 
        result={this.state.searchResult} />}/>
      </div>
    )
  }
}

export default BooksApp
