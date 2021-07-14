const db = require("../models");
const Goods = db.goods;
const Op = db.Sequelize.Op;
const User = db.user;


exports.getall = (req, res) => {

    Goods.findAll({
        raw:true,
        where:{
            amount: {
                [Op.gt]: 0
            },
            owner_id:{
                [Op.ne]: req.body.buyerid
            }
        }
    }).then(result => {
        console.log('货物数据:', result)

        res.status(200).send(
            {
                goods:result
            });
    })

};


exports.getSelfGoods = (req, res) => {

    Goods.findAll({
        raw:true,
        where:{
            amount: {
                [Op.gt]: 0
            },
            owner_id:{
                [Op.eq]: req.body.buyerid
            }
        }
    }).then(result => {
        console.log('自己的货物数据:', result)

        res.status(200).send(
            {
                goods:result
            });
    })

};

exports.deleteSelfGoods = (req, res) => {

    Goods.destroy({where:{id:req.body.g.id}}).then(function(result){
        console.log("delete success");
        res.status(200).send(
            {
                msg:"delete success"
            });
    }).catch(function(err){
        console.log("delete data err: "+err);
    });

};

exports.pay = (req, res) => {
    Goods.update(
        {
            amount: req.body.g.amount-1
        }, {
            where: { id: req.body.g.id }
        }

    );

    User.findOne({
        raw:true,
        where:{
            id:{
                [Op.eq]:req.body.g.owner_id
            }
        }
    }).then( user=>{
        console.log("拥有者：",user);
        User.update(
            {
                coins: user.coins + req.body.g.price
            },{
                where: { id: req.body.g.owner_id }
            }
        ).catch(
            err=>{
                console.log("购买者信息数据库更新失败！", err);
                res.status(500).send({ message: err.message });
            }
        );
    }).catch(err => {
        console.log("查询拥有者信息失败！", err);
        res.status(500).send({ message: err.message });
    });

    console.log("buyerid:",req.body);
    User.findOne({
        raw:true,
        where:{
            id:{
                [Op.eq]:req.body.buyerid
            }
        }
    }).then( user=>{
        User.update(
            {
                coins: user.coins - req.body.g.price
            },{
                where: { id: req.body.buyerid }
            }
        ).catch(
            err=>{
                console.log("购买者信息数据库更新失败！", err);
                res.status(500).send({ message: err.message });
            }
        );
    }).catch(err => {
        console.log("查询购买者信息失败！", err);
        res.status(500).send({ message: err.message });
    });

    res.status(200).send(
        {
            msg:"购买成功！"
        });

};
