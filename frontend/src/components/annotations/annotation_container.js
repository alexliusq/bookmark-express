import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AnnotationCard from './annotation_card';
import { putEditAnnotation, deleteRemoveAnnotation} from '../../actions/annotation_actions';

const mapDispatchToProps = (dispatch) => {
  return {
    editAnno: (annotation) => dispatch(putEditAnnotation(annotation)),
    removeAnnotation: (annotation) => dispatch(deleteRemoveAnnotation(annotation))
  }
}

class AnnotationCardContainer extends React.Component {
  constructor(props) {
    super(props);
  }


}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(AnnotationCardContainer));