import axios from 'axios';
import React, { Component } from 'react';

// UPDATE WITH YOUR API ENDPOINT
const baseURL ="https://29w17n0a04.execute-api.us-east-1.amazonaws.com/default/library";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteBook(isbn, ev){
    // the isbn argument passed by deleteBook function on delete button MUST
    //precede the ev handler
    console.log('Book ISBN-->', isbn);
  }
  
  addBook(ev) {
    const inputISBN = ev.target.querySelector('[id="isbn"]');
    const isbn = inputISBN.value.trim();

    const inputTitle = ev.target.querySelector('[id="title"]');
    const title = inputTitle.value.trim();

    const inputPages = ev.target.querySelector('[id="pages"]');
    const pages = inputPages.value.trim();

    console.log( "ISBN: " + isbn );
    console.log( "Title: " + title );
    console.log( "Pages: " + pages );
    
    let newbook = {
      isbn,
      title,
      pages
    };
    
    axios.post( baseURL + "/books", newbook)
    .then(res => {
      console.log('Axios POST-->', res);
      const cloneUsingES6 = [...this.state.items];
      console.log('Clone-->', cloneUsingES6);
      cloneUsingES6.push(newbook);
      this.setState({cloneUsingES6});
    });
    
    axios.get( baseURL + "/books")
    .then(res => {
      const items=res.data.Items;
      console.log('Axios GET result-->',items);
      
      this.setState({items})
    });

    ev.preventDefault();
  }
  
  componentDidMount() {
    
    axios.get( baseURL + "/books")
    .then(res => {
      const items=res.data.Items;
      this.setState({items});
    });

  }

  render() {

    const {items} = this.state;
    
    return(
    <div>
      <div className="py-5 text-center">
        <h2>Books</h2>
      </div>

      <div className="row">
        <div className="col-md-12 order-md-1">
          <form onSubmit={this.addBook.bind(this)} className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-2 mb-3">
                <label htmlFor="isbn">ISBN</label>
                <input type="number" className="form-control" id="isbn" defaultValue="1" required />
                <div className="invalid-feedback">
                    An ISBN is required.
                </div>
              </div>

              <div className="col-md-8 mb-3">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" defaultValue="" required />
                <div className="invalid-feedback">
                    A book title is required.
                </div>
              </div>

              <div className="col-md-2 mb-3">
                <label htmlFor="pages">Pages</label>
                <input type="number" className="form-control" id="pages" defaultValue="100" required />
                <div className="invalid-feedback">
                    The number of pages is required.
                </div>
              </div>

            </div>
            <button className="btn btn-primary btn-lg btn-block" type="submit">Add book</button>
          </form>
        </div>
      </div>
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ISBN</th>
            <th scope="col">Title</th>
            <th scope="col">Pages</th>
          </tr>
        </thead>
        <tbody>

          {items && items.map(book => <tr key={book.isbn}>
            <th scope="row">{book.isbn}</th>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.pages}</td>
            <td><button onClick={this.deleteBook.bind(this, book.isbn)} type="button" className="btn btn-danger">Delete</button></td>
          </tr>)}

        </tbody>
      </table>

      <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">&copy; 2020 CPSC 2650</p>
      </footer>
    </div>
    );
  }
}

export default Books;
