const express = require('express');
const router = express.Router();

const Tags = require('../../models/tags');

const {isEmpty} = require('validator');


router.post('/', (req, res) => {
  const annoID = req.body.annoID || "";
  const tag = req.body.tag || "";
  if (isEmpty(annoID) || isEmpty(tag)) {
    return res.status(400).json({'error': 'requires both valid annotation Id and tag'})
  }
  Tags.addTagToAnnotation(
    req.body.annoID, req.params.id)
    .then(annoTagIDs => res.json(annoTagIDs))
    .catch(err => res.json(err));
});

router.get('/', (req, res) => {
  getAllTags().then(allTags => res.json(allTags))
    .catch(err => res.json(err));
});

router.delete('/', (req, res) => {
  const annoID = req.body.annoID || "";
  const tag = req.body.tag || "";
  if (isEmpty(annoID) || isEmpty(tag)) {
    return res.status(400).json({'error': 'requires both valid annotation Id and tag'})
  }
  removeTagFromAnnotation(annoId, tag)
    .then(annoTagIDs => res.json(annoTagIDs))
    .catch(err => res.json(err));
})

