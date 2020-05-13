import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { putEditAnnotation, deleteRemoveAnnotation} from '../../actions/annotation_actions';
import AnnotationCard from './annotation_card';
import AnnotationEditCard from './annotation_edit_card';
import Collapse from '@material-ui/core/Collapse';

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
    this.handleEditSave = this.handleEditSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    console.log(id, value);

    const newAnno = {...this.state.annotation, [id]: value}
    this.setState({
      annotation: newAnno
    });
  }

  handleEdit(event) {
    // event.preventDefault();
    this.setState({
      isEditing: true
    })
  }

  handleEditSave(event) {
    // event.preventDefault();
    this.props.editAnno(this.state.annotation);
    this.setState({
      isEditing: false
    })
  }

  handleDelete(event) {
    // event.preventDefault();
    if (window.confirm("Are You Sure you Want to Delete this Annotation")) {
      console.log(this.state.annotation);
      this.props.removeAnnotation(this.state.annotation);
      this.setState({
        isEditing: false
      })
    }
  }

  handleCancel(event) {
    // event.preventDefault();
    this.setState({
      isEditing: false,
      isCreating: false
    })
  }

  render() {
    return (
    <React.Fragment>
    <Collapse in={this.state.isEditing}>
      <AnnotationEditCard
        annotation={this.state.annotation}
        handleInputChange={this.handleInputChange}
        handleEditSave={this.handleEditSave}
        handleCancel={this.handleCancel}
        handleDelete={this.handleDelete}
        />
    </Collapse>
    <Collapse in={!this.state.isEditing}>
    <AnnotationCard
    annotation={this.props.annotation}
    handleEdit={this.handleEdit}
    /> 
    </Collapse>
    </React.Fragment>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(AnnotationCardContainer));