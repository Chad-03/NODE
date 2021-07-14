module.exports = (sequelize, Sequelize) => {
    const Donate = sequelize.define("donate", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      card_set_name: {
        type: Sequelize.STRING
      }
    });
  
    return Donate;
  };