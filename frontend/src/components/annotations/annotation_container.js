import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { putEditAnnotation, deleteRemoveAnnotation} from '../../actions/annotation_actions';
import AnnotationCard from './annotation_card';
import AnnotationEditCard from './annotation_edit_card';

const mapDispatchToProps = (dispatch) => {
  return {
    editAnno: (annotation) => dispatch(putEditAnnotation(annotation)),
    removeAnnotation: (annotation) => dispatch(deleteRemoveAnnotation(annotation))
  }
}

class AnnotationCardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: true,
      annotation: props.annotation
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    console.log(id, value);

    this.setState({
      annotation: {
        [id]: value
      }
    });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <AnnotationEditCard
        annotation={this.state.annotation}
        handleInputChange={this.handleInputChange}
        />
      )
    } else {
      return (
        <AnnotationCard annotation={this.props.annotation}/> 
      )
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(AnnotationCardContainer));