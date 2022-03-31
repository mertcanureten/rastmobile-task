module.exports = (sequelize, Sequelize) => {
  const Cards = sequelize.define("cards", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    badge: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM({
        values: ['backlog','to-do','in-progress','done']
      })
    }
  });

  return Cards;
};
