const db = require("../db");
const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
    try {
      const results = await db.query(
            `SELECT comp_code, amt, paid, add_date, paid_date FROM invoices`);
  
      return res.json({invoices : results.rows});
    }
  
    catch (err) {
      return next(err);
    }
  });

router.get("/:id", async function (req, res, next) {
    try {
      const {id} = req.params     
      const result = await db.query(
            `SELECT comp_code, amt, paid, add_date, paid_date FROM invoices WHERE id=$1`,[id]);
  
      return res.json({invoice : result.rows[0]});
    }
  
    catch (err) {
      return next(err);
    }
  });

router.post("/", async function (req, res, next) {
    try {
      const {comp_code, amt} = req.body
      const result = await db.query(
            `INSERT INTO invoices (comp_code, amt) VALUES($1,$2) RETURNING id, comp_code, amt, paid, add_date, paid_date`,[comp_code,amt]);
  
      return res.status(201).json({invoice : result.rows[0]});
    }
  
    catch (err) {
      return next(err);
    }
  });

router.put("/:id", async function (req, res, next) {
    try {
      const {amt} = req.body
      const {id} = req.params
      const result = await db.query(
            `UPDATE invoices SET amt = $1 WHERE id = $2 RETURNING id, comp_code, amt, paid, add_date, paid_date`,[amt,id]);
  
      return res.json({invoice : result.rows[0]});
    }
  
    catch (err) {
      return next(err);
    }
  });

router.delete("/:id", async function (req, res, next) {
    try {
      const {id} = req.params
      const result = await db.query(
            `DELETE FROM invoices WHERE id = $1`,[id]);
  
      return res.send({msg : "DELETED!!"});
    }
  
    catch (err) {
      return next(err);
    }
  });

module.exports = router;