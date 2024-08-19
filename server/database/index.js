const sqlite3 = require("sqlite3").verbose();
const csvParser = require("csv-parser");
const filePath = require("path").resolve(__dirname, "../data/data.csv");
const fs = require("fs");
const dbFile = './database.db';
var dbExists = fs.existsSync(dbFile);

let db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

async function createDbTable(db) {
  return new Promise((resolve, reject) => {
    const createTableSql = `CREATE TABLE IF NOT EXISTS investors(
      id INT primary key,
      investor_name TEXT,
      investory_type TEXT,
      investor_country TEXT,
      investor_date_added DATE,
      investor_last_updated DATE,
      commitment_asset_class TEXT,
      commitment_amount BIGINT,
      commitment_currency CURRENCY,
      UNIQUE(investor_name, investory_type, investor_country, investor_date_added, investor_last_updated, commitment_asset_class, commitment_amount, commitment_currency)
    )`;

      db.run(createTableSql ,(err, row) => {
          if (err) {
            throw err
          }
          resolve(row);
      });
  });
}



const setupDb = async () => {
  if(!dbExists) {
    await createDbTable(db); 
  }

  fs.createReadStream(filePath)
    .on("error", (error) => {
      // handle error
      console.error(error.message);
      throw error
    })
    .pipe(csvParser())
    .on("data", async (row, index) => {
      const values = Object.values(row);
      
      await insertRowIntoDb(db, values);
    })

  .on("end", async () => {
    // handle end of CSV
    await db.close((err) => {
      if (err) {
        console.error(err.message);
        throw err;
      }
      console.log("Successfully Closed the database connection.");
    });
  });
}

async function insertRowIntoDb(db, values) {
  return new Promise((resolve, reject) => {
    const sqlCommand = `INSERT INTO investors(
      investor_name,
      investory_type,
      investor_country,
      investor_date_added,
      investor_last_updated,
      commitment_asset_class,
      commitment_amount,
      commitment_currency
    ) VALUES('${values[0]}', '${values[1]}', '${values[2]}', '${values[3]}', '${values[4]}', '${values[5]}', '${values[6]}', '${values[7]}')`;

      db.run(sqlCommand,(err, row) => {
          if (err) {
            console.error(err.message);
            // throw err
          }
          resolve(row);
      });
  });
}

module.exports = setupDb