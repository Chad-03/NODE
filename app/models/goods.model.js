module.exports = (sequelize, Sequelize) => {
    const Goods = sequelize.define("goods", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        goods_name: {
            type: Sequelize.STRING
        },
        goods_desc: {
            type: Sequelize.STRING
        },
        img_url: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.FLOAT
        },
        owner_id:{
            type: Sequelize.INTEGER
        }
    });

    return Goods;
};