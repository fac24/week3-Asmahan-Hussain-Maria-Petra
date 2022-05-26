function deletePost(id) {
  const deletePet = /* sql */ `DELETE FROM posts WHERE id = ${id}`;
  return db.query(deletePet);
}
