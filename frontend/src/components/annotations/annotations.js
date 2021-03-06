import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAnnotation, fetchAllAnnotations,
  fetchBookAnnotations } from '../../actions/annotation_actions';
import AnnotationContainer from './annotation_container';
import Maingrid from '../main_grid';
import BookContainer from '../books/book_container';

const mapStateToProps = (state) => {
  return {
    allAnnotations: state.annotations.allAnnotations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookAnnotations: (bookID) => dispatch(fetchBookAnnotations(bookID)),
  }
}

class Annotations extends React.Component {
  constructor(props) {
    super(props);
    const {bookID} = this.props.match.params;
    this.state = {
      bookID,
      isRetrieving: false
    }
  }

  componentDidMount() {
    this.props.fetchBookAnnotations(this.state.bookID);
  }

  render() {
    if (this.props.allAnnotations.length === 0) {
      return (
      <Maingrid>
        <BookContainer bookID={this.state.bookID}/>
        <div>There are no Annotations for this book</div> 
      </Maingrid>
      )
    } else {
      return (
        <Maingrid>
          
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <BookContainer bookID={this.state.bookID}/>
            </Grid>
            {
            this.props.allAnnotations.
              sort((a, b) => a.begin - b.begin)
              .map((anno, idx) => {
              return (
                <Grid item key={idx}>
                  <AnnotationContainer annotation={anno}/>
                </Grid>
              )})
            }
          </Grid>
        </Maingrid>
      )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(Annotations));
