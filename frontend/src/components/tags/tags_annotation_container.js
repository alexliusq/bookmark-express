import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllTags,
  postTagToAnnotation, 
  deleteTagFromAnnotation } from '../../util/tag_api_util';

import TagsAnnotation from './tags_annotation';


class TagsAnnotationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingTags: false,
      annotation_id: props.annotation.id,
      tags: props.annotation.tags || [],
      existingTags: []
    }
    this.handleEditTags = this.handleEditTags.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleEditTags(event) {
    this.setState({
      isEditingTags: true
    });
    getAllTags().then(tags => {
      console.log(tags);
      this.setState({
        existingTags: tags.data
      })
    })
  }

  handleOnChange(event, newValue) {
    console.log(newValue);
    let newExisting = [...this.state.existingTags, ...newValue];
    this.setState({
      tags: newValue,
      existingTags: newExisting
    });
  }

  handleDelete

  handleAddTag(event) {
    event.preventDefault();
  }

  render() {
    return (
      <TagsAnnotation
        isEditingTags={this.state.isEditingTags}
        tags={this.state.tags}
        existingTags={this.state.existingTags}
        handleEditTags={this.handleEditTags}
        handleOnChange={this.handleOnChange}
      />
    )
  }
}

export default TagsAnnotationContainer;