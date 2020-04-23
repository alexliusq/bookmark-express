import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBook, fetchAllBooks } from '../../actions/book_actions';
import BookBox from './book_box';

const mapStateToProps = (state) => {
  return {
    allBooks: state.books.allBooks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllBooks: () => dispatch(fetchAllBooks())
  }
}

class Books extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   allBooks: []
    // }
  }

  componentDidMount() {
    this.props.fetchAllBooks();
      // .then(this.setState({ allBooks: newState}));
  }

  // componentDidUpdate(newState) {
  //   this.setState({ allBooks: newState.allBooks });
  // }

  render() {
    if (this.props.allBooks.length === 0) {
      return (<div>There are no Books</div>)
    } else {
      return (
        <div>
          <h2>All Books</h2>
          {this.props.allBooks.map((book, idx) => (
            <BookBox key={idx} book={book} />
          ))}
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(Books));