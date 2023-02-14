const { response } = require("express");
const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findById(req.params.id)
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    const newThought = Thought.create({
      text: req.body.text,
    })
      .then((thought) => {
        return User.findByIdAndUpdate(
          req.body.userId,
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        !user
          ? res.status(404).json({
              message: "No such user found. Post created without user",
            })
          : res.json({ message: "post created" });
      })
      .catch((err) => {
        console.error(err);
        res.json(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(500).json(err);
        }
      }
    );
  },

  upvoteThought(req, res) {
    Thought.findById(req.params.id).then((response) => {
      const upvoteCount = response.meta.upVotes;
      const downvoteCount = response.meta.downVotes;
      Thought.findByIdAndUpdate(
        req.params.id,
        { meta: { upVotes: upvoteCount + 1, downVotes: downvoteCount } },
        { new: true },
        (err, result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(500).json(err);
          }
        }
      );
    });
  },

  unUpvoteThought(req, res) {
    Thought.findById(req.params.id).then((response) => {
      const upvoteCount = response.meta.upVotes;
      const downvoteCount = response.meta.downVotes;
      Thought.findByIdAndUpdate(
        req.params.id,
        { meta: { upVotes: upvoteCount - 1, downVotes: downvoteCount } },
        { new: true },
        (err, result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(500).json(err);
          }
        }
      );
    });
  },

  downvoteThought(req, res) {
    Thought.findById(req.params.id).then((response) => {
      const upvoteCount = response.meta.upVotes;
      const downvoteCount = response.meta.downVotes;
      Thought.findByIdAndUpdate(
        req.params.id,
        { meta: { upVotes: upvoteCount, downVotes: downvoteCount + 1 } },
        { new: true },
        (err, result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(500).json(err);
          }
        }
      );
    });
  },

  unDownvoteThought(req, res) {
    Thought.findById(req.params.id).then((response) => {
      const upvoteCount = response.meta.upVotes;
      const downvoteCount = response.meta.downVotes;
      Thought.findByIdAndUpdate(
        req.params.id,
        { meta: { upVotes: upvoteCount, downVotes: downvoteCount - 1 } },
        { new: true },
        (err, result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(500).json(err);
          }
        }
      );
    });
  },

  deleteRelation(req, res) {
    User.findOne({ thoughts: req.params.id }).then((result) => {
      const thoughtArray = result.thoughts;
      function removal(value) {
        return value != req.params.id;
      }
      const updatedArray = thoughtArray.filter(removal);
      console.log(updatedArray);
      User.findOneAndUpdate(
        { thoughts: req.params.id },
        { thoughts: updatedArray },
        { new: true }
      ).then((data) => {
        Thought.findByIdAndDelete(req.params.id, (err, result) => {
          if (result) {
            res
              .status(200)
              .json({ result, message: "Thought Deleted Successfully" });
          } else {
            res.status(500).json({ message: "Thought not deleted" });
          }
        });
      });
    });
  },
};
