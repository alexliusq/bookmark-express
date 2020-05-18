import React from 'react';
import ListItemLink from '../shared/list_item_link';

function createAnnoLink(book) {
  if (!book.id) return '';
  return `/annotations/bookID/${book.id}`; 
}

export default function BookLinkListItem (props) {
  const {book} = props;

  return (
    <ListItemLink
      to={createAnnoLink(book)}
      primary={book.title}
    />
  )
}