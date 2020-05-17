const express = require('express');
const router = express.Router();

const Tags = require('../../models/tags');

const {isEmpty} = require('validator');
const {getUserIDFromReq} = require('../../validation/users');


router.post('/', (req, res) => {
  const annotation_id = req.body.annotation_id + '' || "";
  const tag = req.body.tag || "";
  const user_id = getUserIDFromReq(req);
  if (isEmpty(annotation_id) || isEmpty(tag)) {
    return res.status(400).json({'error': 'requires both valid annotation Id and tag'})
  }

  Tags.addTagToAnnotation(annotation_id, tag, user_id)
    .then(annoTagIDs => res.json(annoTagIDs))
    .catch(err => res.json(err));
});

router.get('/', (req, res) => {
  const user_id = getUserIDFromReq(req);
  Tags.getAllTags(user_id).then(allTags => res.json(allTags))
    .catch(err => res.json(err));
});

router.delete('/', (req, res) => {
  const annotation_id = req.body.annotation_id + '' || "";
  const tag = req.body.tag || "";
  const user_id = getUserIDFromReq(req);
  if (isEmpty(annotation_id) || isEmpty(tag)) {
    return res.status(400).json({'error': 'requires both valid annotation Id and tag'})
  }
  Tags.removeTagFromAnnotation(annotation_id, tag, user_id)
    .then(annoTagIDs => res.json(annoTagIDs))
    .catch(err => res.json(err));
})

module.exports = router;
