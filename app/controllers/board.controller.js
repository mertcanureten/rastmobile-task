const db = require("../models");
const Boards = db.boards;
const Cards = db.cards;
const Op = db.Sequelize.Op;

// Create and Save a new Board
exports.create = (req, res) => {  
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Board
  const board = {
    title: req.body.title,
    status: req.body.status ? req.body.status : false
  };

  // Save Board in the database
  Boards.create(board)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Board."
      });
    });
};

// Retrieve all Boards from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Boards.findAll({ include: Cards })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Boards."
      });
    });
};

// Find a single Board with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Boards.findByPk(id, { include: Cards })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Board with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Board with id=" + id
      });
    });
};

// Update a Board by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Boards.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Board was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Board with id=${id}. Maybe Board was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Board with id=" + id
      });
    });
};

// Delete a Board with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Boards.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Board was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Board with id=${id}. Maybe Board was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Board with id=" + id
      });
    });
};

// Delete all Boards from the database.
exports.deleteAll = (req, res) => {
  Boards.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Boards were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Boards."
      });
    });
};

// find all published Board
exports.findAllPublished = (req, res) => {
  Boards.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Boards."
      });
    });
};
