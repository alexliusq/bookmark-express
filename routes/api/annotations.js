const express = require('express');
const router = express.Router();

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
  const editAnno = req.body;
  Annotations.editAnnotation(editAnno)
    .then(anno => res.json(anno))
    .catch(err => {
      res.status(404)
    })
})

router.delete('/', (req, res) => {
  const deleteAnno = req.body;
  Annotations.deleteAnnotation(deleteAnno)
    .then(anno => res.json(anno))
    .catch(err => {
      res.status(404)
    })
})

router.post('/', (req, res) => {
  const createAnno = req.body;
  Annotations.addAnnotation(createAnno)
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
