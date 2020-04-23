import React from 'react';

class BookBox extends React.Component {

  render() {
    const book = this.props.book;
    return (
      <div>
        <h2>{book.title}</h2>
        <ul>
          <li>{`${book.publication_month}/${book.publication_day}/${book.publication_year}`}</li>
          <li>{book.description}</li>
        </ul>
      </div>
    )
  }
}

export default BookBox;