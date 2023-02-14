const router = require("express").Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers);
router.route("/create-user").post(createUser);
router.route("/add-friend").put(addFriend);
router.route("/remove-friend/:id").put(removeFriend);
router
  .route("/user-functions/:id")
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
