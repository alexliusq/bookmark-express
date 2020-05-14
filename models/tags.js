const db = require('./db');

const SQL = require('sql-template-strings');


async function addTagToAnnotation(annotation_id, tag) {

  let tagID = await findTagID(tag);
  if (!tagID) {
    const newTag = await createTag(tag);
    tagID = newTag.id;
  }

  const {rows} = await db.query(SQL`
    INSERT INTO annotations_tags (annotation_id, tag_id)
    VALUES (${annotation_id}, ${tagID}) 
    ON CONFLICT (annotation_id, tag_id) DO UPDATE SET
    annotation_id = EXCLUDED.annotation_id, tag_id = EXCLUDED.tag_id
    RETURNING annotation_id, tag_id
  `);

  if (!rows[0]) return null;

  return {annotation_id, id:tagID, tag}
}

async function removeTagFromAnnotation(annotation_id, tag) {
  const tagID = await findTagID(tag);

  const {rows} = await db.query(SQL`
    DELETE FROM annotations_tags
    WHERE annotation_id = ${annotation_id} AND tag_id = ${tagID}
    RETURNING annotation_id, tag_id
  `);

  await checkAndClearTagID(tagID);
  
  if (!rows[0]) return null;
  return {
    annotation_id,
    id: tag_id,
    tag
  };
}

async function checkAndClearTagID(tag_id) {
  const {rows} = await db.query(SQL`
    SELECT count(*) FROM annotations_tags WHERE tag_id = ${tag_id}
  `);
  const count = rows[0].count;
  if(count > 0) return;

  await db.query(SQL`
    DELETE FROM tags WHERE id = ${tag_id}
  `);
}

async function createTag(tag) {
  const {rows} = await db.query(SQL`
  INSERT INTO tags (tag) VALUES (${tag}) RETURNING id, tag
  `);
  
  return rows[0];
}

async function findTagID(tag) {
  const {rows} = await db.query(SQL`
    SELECT id, tag FROM tags WHERE tag = ${tag}
  `)
  if (!rows[0]) return null;
  return rows[0].id;
}

async function getAllTags() {
  const {rows} = await db.query(SQL`
    SELECT id, tag FROM tags
  `);
  return rows;
}

async function getTagsForAnnotationID(annotation_id) {
  const {rows} = await db.query(SQL`
    SELECT tags.id, tags.tag FROM annotations_tags
    LEFT JOIN tags ON tags.id = annotations_tags.tag_id
    WHERE annotation_id = ${annotation_id}
  `);

  return rows;
}

async function appendTagsToAnno(anno) {
  const tags = await getTagsForAnnotationID(anno.id);
  return {...anno, tags}
}

module.exports = {
  addTagToAnnotation,
  removeTagFromAnnotation,
  getAllTags,
  getTagsForAnnotationID,
  appendTagsToAnno
}