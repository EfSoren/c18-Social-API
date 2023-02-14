const { User, Thought } = require("../models");
//ADD FRIEND ROUTES
module.exports = {
  //Get routes
  getUsers(req, res) {
    User.find()
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json(err));
  },

  getOneUser(req, res) {
    User.findById(req.params.id)
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json(err));
  },
  //Post Routes
  createUser(req, res) {
    const newUser = User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }).then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).json({ message: "User not Created" });
      }
    });
  },

  addFriend(req, res) {
    User.findById(req.body.userId).then((userData) => {
      const friends = userData.friends;
      friends.push(req.body.friendId);
      User.findByIdAndUpdate(
        req.body.userId,
        { friends: friends },
        { new: true },
        (err, result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(500).json({ message: "Friend not added" });
          }
        }
      );
    });
  },
  removeFriend(req, res) {
    User.findOne({ _id: req.params.id }).then((result) => {
      const friendArray = result.friends;
      function removal(value) {
        return value != req.body.friendId;
      }
      const updatedArray = friendArray.filter(removal);
      console.log(updatedArray);
      User.findOneAndUpdate(
        { _id: req.params.id },
        { friends: updatedArray },
        { new: true },
        (err, result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(500).json({ message: "Friend not added" });
          }
        }
      );
    });
  },
  updateUser(req, res) {
    User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      {
        new: true,
      },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(500).json({ message: "User not updated" });
        }
      }
    );
  },

  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: "User not deleted" });
      }
    });
  },
};
