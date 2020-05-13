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
      isEditing: false,
      isCreating: false,
      annotation: props.annotation
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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

  handleEdit(event) {
    event.preventDefault();
    this.setState({
      isEditing: true
    })
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      isEditing: false,
      isCreating: false
    })
  }

  render() {
    if (this.state.isEditing) {
      return (
        <AnnotationEditCard
        annotation={this.state.annotation}
        handleInputChange={this.handleInputChange}
        handleCancel={this.handleCancel}
        />
      )
    } else {
      return (
        <AnnotationCard
        annotation={this.props.annotation}
        handleEdit={this.handleEdit}
        /> 
      )
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(AnnotationCardContainer));