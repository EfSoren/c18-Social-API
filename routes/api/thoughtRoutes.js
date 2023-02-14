const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteRelation,
  upvoteThought,
  unUpvoteThought,
  downvoteThought,
  unDownvoteThought,
} = require("../../controllers/thoughtController");
router.route("/").get(getThoughts);
router.route("/create").post(createThought);
router.route("/upvote/:id").put(upvoteThought);
router.route("/upvote-reverse/:id").put(unUpvoteThought);
router.route("/downvote/:id").put(downvoteThought);
router.route("/downvote-reverse/:id").put(unDownvoteThought);
router
  .route("/thought-functions/:id")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteRelation);

module.exports = router;
