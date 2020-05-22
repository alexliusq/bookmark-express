import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBook, fetchAllBooks } from '../../actions/book_actions';
import BookLinkListItem from './book_link_list_item';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddBookContainer from './add_book_container';

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


function AllBooksHeader(props) {
  const useStyles = makeStyles((theme) => ({
    bookHeader: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between"
    }
  }));

  const classes = useStyles();
  return (
    <div className={classes.bookHeader}>
      <Typography variant="h2">
        All Books
      </Typography>
      <AddBookContainer />
    </div>
  )
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

  render() {
    return (
      <React.Fragment>
      <AllBooksHeader />
      {
        this.props.allBooks.length === 0 ?
        (<div>There are no Books</div>) :
        (<List>
          {this.props.allBooks.map((book, idx) => (
            <BookLinkListItem key={idx} book={book} />
          ))}
        </List>)
      }
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(Books));