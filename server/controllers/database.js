import pool from "../sql/connection.js";

const getQuestion = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const sql = `SELECT * FROM sipsip.questions WHERE id = ${id}`;

  try {
    const results = await sqlQueryProm(sql);
    return res.json(results[0]);
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

export { getQuestion };
