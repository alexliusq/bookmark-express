import React from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAnnotation, fetchAllAnnotations,
  fetchBookAnnotations } from '../../actions/annotation_actions';
import AnnotationCard from './annotation_card';

const mapStateToProps = (state) => {
  return {
    annotation: state.annotations.annotations,
    allAnnotations: state.annotations.allAnnotations,
    bookAnnotations: state.annotations.bookAnnotations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookAnnotations: () => dispatch(fetchBookAnnotations()),
  }
}

class Annotations extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {bookID} = this.props.match.params;
    this.props.fetchBookAnnotations(bookID);
  }

  render() {
    return (
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(Annotations));
