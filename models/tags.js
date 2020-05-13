const db = require('./db');

const SQL = require('sql-template-strings');


async function addTagToAnnotation(annoID, tag) {
  let tagID = await findTagID(tag);
  if (!tagID) {
    const newTag = await createTag(tag);
    tagID = newTag.id;
  }

  const {rows} = await db.query(SQL`
    INSERT INTO annotations_tags (annotation_id, tag_id)
    VALUES (${annoID}, ${tagID}) RETURNING annotation_id, tag_id
  `);

  return rows[0];
}

async function removeTagFromAnnotation(annoID, tag) {
  const tagID = await findTagID(tag);

  const {rows} = await db.query(SQL`
    DELETE FROM annotations_tags
    WHERE annotation_id = ${annoID} AND tag_id = ${tagID}
    RETURNING annotation_id, tag_id
  `);

  return rows[0];
}

async function createTag(tag) {
  const {rows} = await db.query(SQL`
  INSERT INTO tags (tag) VALUES (${tag}) RETURNING id, tag
  `);
  
  return rows[0];
}

async function findTagID(tag) {
  const {rows} = await db.query(SQL`
    SELECT id, tag FROM tags WHERE tag = ${tag} RETURNING id
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

module.exports = {
  addTagToAnnotation,
  removeTagFromAnnotation,
  getAllTags
}