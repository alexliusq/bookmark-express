import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BookCard from './book_card';
import { fetchBook } from '../../actions/book_actions';

const mapStateToProps= (state) => {
  return {
    book: state.books.book
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBook: (bookID) => dispatch(fetchBook(bookID))
  }
}

class BookContainer extends React.Component {
  constructor(props) {
    super(props);
    let bookID;
    if (this.props.bookID) {
      bookID = this.props.bookID;
    } else if (this.props.match) {
      bookID = this.props.match.params.bookID;
    }
      
    this.state = {
      bookID
    }
  }

  componentDidMount() {
    this.props.fetchBook(this.state.bookID);
  }

  render() {
    return <BookCard book={this.props.book}/>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(BookContainer));