import React from 'react';
import AddBook from './add_book';
import { connect } from 'react-redux';
import { addGoodreadsBook } from '../../actions/book_actions';
import { isInt, isEmpty } from 'validator';

const mapDispatchToProps = dispatch => ({
  addBook: (goodreadsID) => dispatch(addGoodreadsBook(goodreadsID))
})

class AddBookContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodreadsID: '',
      goodreadsError: false,
    }

    this.handleGoodreadsIDChange = this.handleGoodreadsIDChange.bind(this);
  }

  handleGoodreadsIDChange(event) {
    const goodreadsID = event.target.value;
    const goodreadsError = !isInt(goodreadsID);
    this.setState({
      goodreadsID,
      goodreadsError,
    });
  }


  render() {
    const addBookProps = {
      handleGoodreadsIDChange: this.handleGoodreadsIDChange,
      goodreadsID: this.state.goodreadsID,
      goodreadsError: this.state.goodreadsError
    }
    return (
      <AddBook 
        {...addBookProps}
      />
    )
  }
}

export default connect(null, mapDispatchToProps)(AddBookContainer);
