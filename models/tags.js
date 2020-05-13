const db = require('./db');

const SQL = require('sql-template-strings');


async function addTagToAnnotation(annotation_id, tag) {
  console.log(1);
  let tagID = await findTagID(tag);
  console.log('hello');
  if (!tagID) {
    const newTag = await createTag(tag);
    tagID = newTag.id;
  }
  console.log(2);
  const {rows} = await db.query(SQL`
    INSERT INTO annotations_tags (annotation_id, tag_id)
    VALUES (${annotation_id}, ${tagID}) RETURNING annotation_id, tag_id
  `);
  console.log(3);
  return rows[0];
}

async function removeTagFromAnnotation(annotation_id, tag) {
  const tagID = await findTagID(tag);

  const {rows} = await db.query(SQL`
    DELETE FROM annotations_tags
    WHERE annotation_id = ${annotation_id} AND tag_id = ${tagID}
    RETURNING annotation_id, tag_id
  `);

  await checkAndClearTagID(tagID);

  return rows[0];
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

module.exports = {
  addTagToAnnotation,
  removeTagFromAnnotation,
  getAllTags
}