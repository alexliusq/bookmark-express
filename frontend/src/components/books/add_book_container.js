import React from 'react';
import AddBook from './add_book';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  addBook: (goodreadsID) => dispatch(addGoodreadsBook(goodreadsID))
})

class AddBookContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AddBook />
    )
  }
}

export default connect(null, mapDispatchToProps)(AddBookContainer);
