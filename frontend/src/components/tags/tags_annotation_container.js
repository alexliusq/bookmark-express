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
    this.handlePostTagToAnnotation = this.handlePostTagToAnnotation.bind(this);
    this.handleUpdateExistingTags = this.handleUpdateExistingTags.bind(this);
  }

  handleEditTags(event) {
    this.setState({
      isEditingTags: true
    });
    this.handleUpdateExistingTags();
  }

  handleUpdateExistingTags() {
    getAllTags().then(tags => {
      console.log(tags);
      this.setState({
        existingTags: tags.data
      })
    })
  }

  handlePostTagToAnnotation(newOption) {
    postTagToAnnotation({
      "annotation_id" : this.state.annotation_id,
      "tag": newOption.tag
    }).then(res => {
      const annoTag = res.data;
      const createdOption = {id: annoTag.id, tag: annoTag.tag};
      console.log('createdOption', createdOption);
      console.log('current state', this.state.tags);
      console.log('current existing tags', this.state.existingTags);
      const newTagsState = this.state.tags
        .map(option => option.tag === createdOption.tag ? createdOption : option);
      const newExistingTagsState = this.state.existingTags
        .map(option => option.tag === createdOption.tag ? createdOption : option);
      console.log('newTagsState', newTagsState);
      console.log('newExistingTagState', newExistingTagsState);
      this.setState({
        tags: newTagsState,
        existingTags: newExistingTagsState
      })
    }).catch(err => console.log(err));
  }

  handleDeleteTagFromAnnotation(deletedOption) {
    // console.log(deletedOption);
    // console.log({
    //   "annotation_id" : this.state.annotation_id,
    //   "tag": deletedOption.tag
    // });
    deleteTagFromAnnotation({
      "annotation_id" : this.state.annotation_id,
      "tag": deletedOption.tag
    }).then(annoTag => {
      this.handleUpdateExistingTags()
    }).catch(err => console.log(err));
  }

  handleOnChange(event, newValue) {
    const newOptions = newValue.filter(newOption => {
      return this.state.tags.filter(option => option.tag === newOption.tag).length === 0
    });

    const deletedOptions = this.state.tags.filter(option => {
      return newValue.filter(newOption => option.tag === newOption.tag).length === 0;
    });

    console.log('new items', newOptions);
    console.log('deleted items', deletedOptions);

    let newExisting = [...this.state.existingTags, ...newOptions];
    newExisting = newExisting.filter(option => {
      return deletedOptions.filter(toDelete => option.tag === toDelete.tag).length === 0;
    })
    this.setState({
      tags: newValue,
      existingTags: newExisting
    });

    newOptions.forEach(newOption => this.handlePostTagToAnnotation(newOption));
    deletedOptions.forEach(deletedOption => this.handleDeleteTagFromAnnotation(deletedOption));
  }


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