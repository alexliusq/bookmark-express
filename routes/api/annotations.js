const express = require('express');
const router = express.Router();

const validateAnnotation = require('../../validation/annotations');
const Annotations = require('../../models/annotations');
// const { validateBookDetails } = require('../../validation/books');

router.get('/', (req, res) => {
  Annotations.getAllAnnotations()
    .then(annoResponse => {
      res.json(annoResponse);
    })
    .catch(err =>
      res.status(404).json({ noAnnotationsFound: "No Annotations Found"}));
});

router.get('/:id', (req, res) => {
   Annotations.getAnnotationByID(req.params.id)
    .then(anno => res.json(anno))
    .catch(err => {
      res.status(404).json({ noAnnotationFound: "No Annotation with ID Found"});
    })
})

router.get('/bookID/:id', (req, res) => {
  Annotations.getAnnotationsByBookID(req.params.id)
    .then(annos => res.json(annos))
    .catch(err => {
      res.status(404).json({ noAnnotationsFound: "No Annotations Associated with Book ID found"});
    })
})

router.put('/', (req, res) => {
  const { errors, isValid } = validateAnnotation(req.body);
        
  if (!isValid) {
    return res.status(400).json(errors);
  }
  if (!req.body.id) {
    return res.status(400).json({'errors': 'Edit requires id'})
  }

  Annotations.editAnnotation(req.body)
    .then(anno => res.json(anno))
    .catch(err => {
      res.status(404)
    })
})

router.delete('/', (req, res) => {
  const deleteAnno = req.body;
  if (!req.body.id) {
    return res.status(400).json({'errors': 'Delete requires id'})
  }
  Annotations.deleteAnnotation(deleteAnno)
    .then(anno => res.json(anno))
    .catch(err => {
      res.status(404)
    })
})

router.post('/', (req, res) => {
  const { errors, isValid } = validateAnnotation(req.body);
        
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Annotations.addAnnotation(req.body)
    .then(anno => res.json(anno))
    .catch(err => {
      res.status(404).json(err);
    })
})

router.post('/calibre', (req, res) => {
  const anno = req.body;
  if (!anno.kind) return res.status(404).json({'kind': 'Annotation needs kind'});
  if (!anno.text) return res.status(404).json({'text': 'Annotation needs text'});
  Annotations.addCalibreAnnotation(anno)
    .then(anno => res.json(anno))
    .catch(err => {
      res.status(404).json(err);
    })
})

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
