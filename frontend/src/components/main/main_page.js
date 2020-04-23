import React from 'react';
import Books from '../books/books';

class MainPage extends React.Component {
  
  render() {
    return (
      <div>
        <h1>Bookmarker</h1>
        <Books />
      </div>
    )
  }
}

export default MainPage;