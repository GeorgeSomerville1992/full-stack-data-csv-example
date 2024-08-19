const sqlite3 = require("sqlite3").verbose();

async function selectAllInvestors(db) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT 
       ROW_NUMBER () OVER ( 
          ORDER BY investor_name
      ) id,
      investor_name, 
      investory_type, 
      investor_country, 
      investor_date_added, 
      commitment_amount FROM investors`, function(err, rows) {  
      if(err) {
        console.err(err.message);
        reject(err);
      }
  
      if(rows) {
        resolve(rows);
      }
    });
  });
}

async function fetchInvestors() {
  let db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the in-memory SQlite database.");
  });

  const investors = await selectAllInvestors(db);

  return investors;
}

function formatInvestments(investments) {
  const investorNames = [...new Set(investments.map((investment) => {
    return investment.investor_name
  }))]
  
  // remap investments so I have all investments grouped by name in each array
  const investmentsRemapped = investorNames.map((invester) => {
    const investmentRemapArray = []
    investments.forEach((investment) => {
        if(investment.investor_name === invester) {
            investmentRemapArray.push(investment)
        }
    })
    const investmentsAggregatedArray = []

    /* 
      Now I have my investments grouped by name, all data associated with the name is the same, 
      apart from commitment_amount
      We want the total of each record and grouped by name, so I can merge each record and aggregate the total
    */
    const aggregatedTotal = investmentRemapArray.reduce((acc, investor) => {
        return {
            ...acc,
            commitment_amount: Number(acc.commitment_amount) + Number(investor.commitment_amount)
        }
    })
    
    investmentsAggregatedArray.push(aggregatedTotal);
    return investmentsAggregatedArray
  });

  return investmentsRemapped.flat();
}


const investors = async (req, res, next) => {
  let response
    try {
      response = await fetchInvestors()
      const formattedInvestments = formatInvestments(response);

      res.json(formattedInvestments);
    } catch (e) {
        console.error(e);
        res.sendStatus(500) && next();
    }

};

module.exports = investors

