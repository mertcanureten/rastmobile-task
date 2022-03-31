module.exports = (sequelize, Sequelize) => {
  const Boards = sequelize.define("boards", {
    title: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });

  return Boards;
};
