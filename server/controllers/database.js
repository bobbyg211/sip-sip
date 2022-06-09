import pool from "../sql/connection.js";

const getQuestions = async (req, res) => {
  const { tenant: schema } = req.query;

  const sql = `SELECT * FROM ${schema}.questions;`;

  try {
    const results = await sqlQueryProm(sql);
    return res.json(results);
  } catch (err) {
    console.log(err);
  }
};

const sqlQueryProm = (sql) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export { getQuestions };
