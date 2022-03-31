const db = require("../models");
const Cards = db.cards;
const Boards = db.boards;
const Op = db.Sequelize.Op;

// Create and Save a new card
exports.create = (req, res) => {  
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a card
  const card = {
    title: req.body.title,
    description: req.body.description,
    color: req.body.color,
    boardId: req.body.boardId,
    status: req.body.status ? req.body.status : "Backlog" // if status is empty status be backlog
  };

  // Save card in the database
  Cards.create(card)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the card."
      });
    });
};

// Retrieve all Cards from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Cards.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Cards."
      });
    });
};

// Find a single card with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cards.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find card with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving card with id=" + id
      });
    });
};

// Update a card by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cards.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "card was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update card with id=${id}. Maybe card was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating card with id=" + id
      });
    });
};

// Delete a card with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cards.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "card was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete card with id=${id}. Maybe card was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete card with id=" + id
      });
    });
};

// Delete all Cards from the database.
exports.deleteAll = (req, res) => {
  Cards.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Cards were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Cards."
      });
    });
};
