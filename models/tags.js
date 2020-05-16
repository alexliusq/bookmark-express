const db = require('./db');
const SQL = require('sql-template-strings');
const multipleUsersEnabled = require('../config/multiple_users').enabled;


async function addTagToAnnotation(annotation_id, tag, user_id) {

  let tagID = await findTagID(tag, user_id);
  if (!tagID) {
    const newTag = await createTag(tag, user_id);
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

async function removeTagFromAnnotation(annotation_id, tag, user_id) {
  const tagID = await findTagID(tag);

  const {rows} = await db.query(SQL`
    DELETE FROM annotations_tags
    WHERE annotation_id = ${annotation_id} AND tag_id = ${tagID}
    RETURNING annotation_id, tag_id
  `);

  checkAndClearTagID(tagID, user_id);
  
  if (!rows[0]) return null;
  return {
    annotation_id,
    id: tagID,
    tag
  };
}

async function checkAndClearTagID(tag_id, user_id) {
  const query = SQL`
  SELECT count(*) FROM annotations_tags WHERE tag_id = ${tag_id}`;

  if (multipleUsersEnabled) {
    query.append(SQL` AND user_id = ${user_id}`)
  }

  const {rows} = await db.query();
  const count = rows[0].count;
  if(count > 0) return;

  await db.query(SQL`
    DELETE FROM tags WHERE id = ${tag_id}
  `);
}

async function createTag(tag, user_id) {

  const {rows} = await db.query(SQL`
  INSERT INTO tags (tag) VALUES (${tag}) RETURNING id, tag
  `);

  if (multipleUsersEnabled) {
    await db.query(SQL`
    UPDATE tags SET user_id = ${user_id} WHERE id = ${rows[0].id}
    `);
  }
  
  return rows[0];
}

async function findTagID(tag, user_id) {
  const query = SQL`SELECT id, tag FROM tags WHERE tag = ${tag}`;
  if (multipleUsersEnabled) {
    query.append(SQL` AND user_id = ${user_id}`);
  }

  const {rows} = await db.query(query)
  if (!rows[0]) return null;
  return rows[0].id;
}

async function getAllTags(user_id) {
  const query = SQL`SELECT id, tag FROM tags`;

  if (multipleUsersEnabled) {
    query.append(SQL` WHERE user_id = ${user_id}`);
  }

  const {rows} = await db.query(query);
  return rows;
}

async function getTagsForAnnotationID(annotation_id, user_id) {
  const query = SQL`
  SELECT tags.id, tags.tag FROM annotations_tags
  LEFT JOIN tags ON tags.id = annotations_tags.tag_id
  WHERE annotation_id = ${annotation_id}`;

  if (multipleUsersEnabled) {
    query.append(SQL` AND user_id = ${user_id}`);
  }

  const {rows} = await db.query(query);
  return rows;
}

async function appendTagsToAnno(anno, user_id) {
  const tags = await getTagsForAnnotationID(anno.id, user_id);
  return {...anno, tags}
}

module.exports = {
  addTagToAnnotation,
  removeTagFromAnnotation,
  getAllTags,
  getTagsForAnnotationID,
  appendTagsToAnno
}