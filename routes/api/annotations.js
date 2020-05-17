const express = require('express');

const router = express.Router();

const validateAnnotation = require('../../validation/annotations');
const Annotations = require('../../models/annotations');
const Tags = require('../../models/tags');
// const { validateBookDetails } = require('../../validation/books');

const { getUserIDFromReq } = require('../../validation/users');


router.get('/', async (req, res) => {
  try {
    const annos = await Annotations.getAllAnnotations(10000, getUserIDFromReq(req));
    const response = await Promise.all(annos.map(Tags.appendTagsToAnno));

    res.json(response);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const anno = await Annotations.getAnnotationByID(req.params.id, getUserIDFromReq(req));
    const response = await Tags.appendTagsToAnno(anno);
    res.json(response);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get('/bookID/:id', async (req, res) => {
  try {
    const annos = await Annotations.getAnnotationsByBookID(req.params.id, getUserIDFromReq(req));
    const response = await Promise.all(annos.map(Tags.appendTagsToAnno));

    res.json(response);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put('/', async (req, res) => {
  const { errors, isValid } = validateAnnotation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  if (!req.body.id) {
    return res.status(400).json({ errors: 'Edit requires id' });
  }

  try {
    const anno = await Annotations.editAnnotation(req.body, getUserIDFromReq(req));
    const response = await Tags.appendTagsToAnno(anno);
    res.json(response);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete('/', (req, res) => {
  const deleteAnno = req.body;
  if (!req.body.id) {
    return res.status(400).json({ errors: 'Delete requires id' });
  }
  Annotations.deleteAnnotation(deleteAnno)
    .then((anno) => res.json(anno))
    .catch((err) => {
      res.status(404);
    });
});

router.post('/', (req, res) => {
  const { errors, isValid } = validateAnnotation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Annotations.addAnnotation(req.body, getUserIDFromReq(user))
    .then((anno) => res.json(anno))
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post('/calibre', (req, res) => {
  const anno = req.body;
  if (!anno.kind) return res.status(404).json({ kind: 'Annotation needs kind' });
  if (!anno.text) return res.status(404).json({ text: 'Annotation needs text' });
  Annotations.addCalibreAnnotation(anno, getUserIDFromReq(req))
    .then((anno) => res.json(anno))
    .catch((err) => {
      res.status(404).json(err);
    });
});

module.exports = router;

// router.post('/',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//       const { errors, isValid } = validateTweetInput(req.body);

//       if (!isValid) {
//         return res.status(400).json(errors);
//       }

//       const newTweet = new Tweet({
//         text: req.body.text,
//         user: req.user.id
//       });

//       newTweet.save().then(tweet => res.json(tweet));
//     }
//   );
