//pengalamatan url
//misalnya get post, dan lain sebagainya

const router = require('express').Router()
const fire = require('./fire')
const bodyParser = require('body-parser')
const db = fire.firestore()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

const Anggota = require("../models/dataAnggota");

// login
router.post('/api/login', async (req, res) => {
    let getUser = await db.collection('username')
        getUser = await getUser.where("email", "==", String(req.body.email))
        getUser = await getUser.where("password", "==", String(req.body.password))
        getUser = await getUser.get();

     res.send(getUser.size == 0 ? false : true);
})

// ambil data anggota
router.get('/api/anggota', async (req, res) => {
    try {
        let anggota;
        anggota = await Anggota.find();
        res.json(anggota);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

// tambah data anggota
router.post('/api/anggota', async (req, res) => {
    const anggota  = new Anggota({
        Nama: req.body.nama,
        NIM: req.body.nim,
        Fakultas: req.body.fakultas,
        Jabatan: req.body.jabatan,
    })

    anggota.save().then(rest => res.send(rest));
})

// update data anggota
router.put('/api/anggota/:id', async (req, res) => {
    try {
        const anggota = await Anggota.updateOne(
            {_id: req.params.id},
            {$set: {
                Nama: req.body.nama,
                NIM: req.body.nim,
                Fakultas: req.body.fakultas,
                Jabatan: req.body.jabatan,
            }}
        )
        res.json(anggota);
    } catch (err) {
        res.json({
          message: err
        })
    }
});

// hapus data anggota
router.delete('/api/anggota/:id', async (req, res) => {
    try{
        const anggota = await Anggota.deleteOne({_id: req.params.id})
        res.json(anggota);
    }catch (err) {
        res.json({
            message: err
        })
    }
});



module.exports = router;