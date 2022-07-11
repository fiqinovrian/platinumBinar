const Item = require('../models').Item;

module.exports = {
    create(req, res) {
        const data = {
            code: req.body.code,
            name: req.body.name,
            price: req.body.price
        }

        Item.create(data)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    show(req, res) {
        Item.findAll().then(Items => {
            res.status(200).json(Items);
        })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    getById(req, res) {
        const idItem = req.params.id;
        return Item.findByPk(idItem, {
            include: []
        })
            .then((Item) => {
                if (!Item) {
                    return res.status(404).json("Item tidak ditemukan")
                }
                return res.status(200).json(Item)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },

    updateById(req, res) {
        Item.update({
            code: req.body.code,
            name: req.body.name,
            price: req.body.price
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.status(200).json("Produk berhasil di update")
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },

    deleteById(req, res) {
        const idItem = req.params.id;
        Item.destroy({ where: { id: idItem } })
            .then(() => {
                res.status(200).json("Item berhasil dihapus")
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }
}