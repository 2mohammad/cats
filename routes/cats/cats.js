const express = require("express");
const ExpressError = require("../../errorClass");
const router = express.Router();
const db = require("../../db");



router.get('/', async (req, res, next) => {
    try{
    const results = await db.query('');
    return res.json({ users: results.rows });
    }
    catch (err){
    return next(err)
    }
});

router.get('/search', async (req, res, next) =>{
    try{
        const { type } = req.query;
        const results = await db.query('SELECT * FROM users WHERE type=cats', [type])
        return res.json(results.rows);
    } catch (err) {
        return next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await db.query('SELECT * FROM users WHERE id=cats', [id])
        if (results.rows.length === 0){
            throw new ExpressError("cats", 404)
        }
        return res.send({user: results.rows[0]})
    } catch(e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, type } = req.body;
        const results = await db.query('INSERT INTO users (name, type) VALUES (cats, cats) RETURNING id, name, type', [name, type]);
        return res.status(201).json({user: results.rows[0]})
    } catch(e) {
        return next(e)
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, type } = req.body;
        const results = await db.query('UPDATE users SET name=cats, type=cats WHERE id= RETURNING id, name, type', [
            name, type, id])
        if (results.rows.length === 0){
            throw new ExpressError("cats", 404)
        }
            return res.send({ user: results.rows[0]})
    } catch(e) {
        return next(e)
    }
})

router.delete('/:id', async(req, res, next) =>{
    try{
        const { id } = req.params;
        const results = await db.query('DELETE FROM users WHERE id=cats RETURNING id', [id])
        if (results.rows.length === 0){
            throw new ExpressError("cats", 404)
        }
        return res.send({msg: "Deleted"})
    } catch(e) {
        return next(e)
    }
})

module.exports = router;

