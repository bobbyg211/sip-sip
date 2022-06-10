import pool from "../sql/connection.js";

const getQuestion = async (req, res) => {
  const { mode } = req.query;
  let sql;

  if (mode) {
    sql = `SELECT * FROM sipsip.questions WHERE sipped = FALSE ORDER BY RAND() LIMIT 1;`;
  } else {
    sql = `SELECT * FROM sipsip.questions WHERE sipped = FALSE AND dirty = FALSE ORDER BY RAND() LIMIT 1;`;
  }

  try {
    let results = await sqlQueryProm(sql);

    if (results.length > 0) {
      sql = `UPDATE sipsip.questions SET sipped = TRUE WHERE id = ${results[0].id}`;
      await sqlQueryProm(sql);
    } else {
      if (mode) {
        sql = `
          UPDATE sipsip.questions SET sipped = FALSE;
          SELECT * FROM sipsip.questions WHERE sipped = FALSE ORDER BY RAND() LIMIT 1;
        `;
      } else {
        sql = `
          UPDATE sipsip.questions SET sipped = FALSE WHERE dirty = FALSE;
          SELECT * FROM sipsip.questions WHERE sipped = FALSE AND dirty = FALSE ORDER BY RAND() LIMIT 1;
        `;
      }

      const reset = await sqlQueryProm(sql);
      results = reset[1];
    }

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
