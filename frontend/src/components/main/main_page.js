import React from 'react';
import Books from '../books/books';

import PrimarySearchAppBar from '../Appbar';

// console.log(PrimarySearchAppBar);

class MainPage extends React.Component {
  
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <h1>Bookmarker</h1>
        <Books />
      </div>
    )
  }
}

export default MainPage;