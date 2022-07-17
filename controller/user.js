const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const rahasia = 'Ini rahasia ga boleh disebar-sebar';

module.exports = {
    create(req, res) {
        const data = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            password: bcrypt.hashSync(req.body.password, 10)
        }

        User.create(data)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    show(req, res){
        User.findAll().then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    getById(req, res) {
        const idUser = req.params.id;
        return User.findByPk(idUser, {
            include: []
        })
        .then((user) => {
            if(!user) {
                return res.status(404).json("User tidak ditemukan")
            }
            return res.status(200).json(user)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },

    updateById(req, res){
        User.update({ 
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.status(200).json("User berhasil di update")
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    },

    deleteById(req, res){
        const idUser = req.params.id;
        User.destroy({ where: { id: idUser } })
        .then(() => {
            res.status(200).json("User berhasil dihapus")
        })
        .catch((err) => {
            res.status(500).json(err)
        })

    },

    loginUser(req, res) {
        return User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            
            //Cek username and password
            const isPasswordVAlid = bcrypt.compareSync(req.body.password, user.password);
           
            if (!isPasswordVAlid) {
                return res.json({ message: 'Invalid Username or Password'});
            }

            //Buat Token
            const accessToken = jwt.sign({      
                id: user.id,
                username: user.username,
            }, rahasia)

    
            return res.json({
                id: user.id,
                username: user.username,
                accessToken: accessToken,
            });
        })
        .catch((err) => {
            console.log("step 4", err)
            res.status(500).json(err)
        });
    }
}