const express = require('express');
const router = express.Router();

const Tags = require('../../models/tags');

const {isEmpty} = require('validator');


router.post('/', (req, res) => {
  const annotation_id = req.body.annotation_id + '' || "";
  const tag = req.body.tag || "";
  if (isEmpty(annotation_id) || isEmpty(tag)) {
    return res.status(400).json({'error': 'requires both valid annotation Id and tag'})
  }
  console.log(annotation_id, tag);
  Tags.addTagToAnnotation(annotation_id, tag)
    .then(annoTagIDs => res.json(annoTagIDs))
    .catch(err => res.json(err));
});

router.get('/', (req, res) => {
  Tags.getAllTags().then(allTags => res.json(allTags))
    .catch(err => res.json(err));
});

router.delete('/', (req, res) => {
  const annotation_id = req.body.annotation_id + '' || "";
  const tag = req.body.tag || "";
  if (isEmpty(annotation_id) || isEmpty(tag)) {
    return res.status(400).json({'error': 'requires both valid annotation Id and tag'})
  }
  Tags.removeTagFromAnnotation(annotation_id, tag)
    .then(annoTagIDs => res.json(annoTagIDs))
    .catch(err => res.json(err));
})

module.exports = router;
