import React from 'react';
import Books from '../books/books';

class MainPage extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <h1>Bookmarker</h1>
        <Books />
      </React.Fragment>
    )
  }
}

export default MainPage;