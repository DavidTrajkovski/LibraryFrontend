import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import Categories from '../Categories/categories';
import LibraryService from "../../repository/libraryRepository";
import Header from '../Header/header';
import BookEdit from "../Books/BookEdit/bookEdit";
import BookAdd from '../Books/BookAdd/bookAdd';
import Books from '../Books/BookList/books';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          categories: [],
          authors: [],
          books: [],
          selectedBook: {}
        }
      }

    render() {
      return (
          <Router>
            <main>
              <Header/>
              <div className="container">
                <Routes>
                  <Route path={"/categories"} exact element={
                    <Categories categories={this.state.categories}/>}/>
                  <Route path={"/books/add"} exact element={
                    <BookAdd categories={this.state.categories}
                              authors={this.state.authors}
                              onAddBook={this.addBook}/>}/>
                  <Route path={"/books/edit/:id"} exact element={
                    <BookEdit categories={this.state.categories}
                              authors={this.state.authors}
                              onEditBook={this.EditBook}
                              book={this.state.selectedBook}/>}/>
                  <Route path={"/books"} exact element={
                    <Books books={this.state.books}
                              categories={this.state.categories}
                              authors={this.state.authors}
                              onDelete={this.deleteBook}
                              onEdit={this.getBook}
                              onMark={this.markBook}/>}/>                            
                  <Route path="/" element={<Navigate replace to="/books"/>}/>
                </Routes>
              </div>
            </main>
          </Router>
      );
    }

    loadCategories = () => {
      LibraryService.fetchCategories()
          .then((data) => {
            this.setState({
              ...this.state,
              categories: data.data
            })
          });
    }

    loadCountries = () => {
      LibraryService.fetchCountries()
          .then((data) => {
            this.setState({
              ...this.state,
              countres: data.data
            })
          });
    }

    loadAuthors = () => {
      LibraryService.fetchAuthors()
          .then((data) => {
            this.setState({
              ...this.state,
              authors: data.data
            })
          });
    }

    loadBooks = () => {
      LibraryService.fetchBooks()
          .then((data) => {
            this.setState({
              ...this.state,
              books: data.data
            })
          });
    }

    getBook = (id) => {
      LibraryService.getBook(id)
      .then((data) => {
        this.setState({
          selectedBook: data.data
        })
      })
    }

    loadBooksPagination = () => {
      LibraryService.fetchBooksPagination()
          .then((data) => {
            this.setState({
              ...this.state,
              books: data.data
            })
          });
    }

    deleteBook = (id) => {
      LibraryService.deleteBook(id)
          .then(() => {
            this.loadBooks();
          });
    }

    addBook = (name,category,authorId,availableCopies) => {
      LibraryService.addBook(name,category,authorId,availableCopies)
          .then(() => {
            this.loadBooks();
          });
    }

    EditBook = (id,name,category,authorId,availableCopies) => {
      LibraryService.editBook(id,name,category,authorId,availableCopies)
          .then(() => {
            this.loadBooks();
          });
    }

    markBook = (id) => {
      LibraryService.markBook(id)
          .then(() => {
            this.loadBooks();
          });
    }
    
    componentDidMount() {
        this.loadCategories();
        this.loadCountries();
        this.loadAuthors();
        this.loadBooks();
    }
}

export default App;
