const sqlite3 = require("sqlite3").verbose();


async function selectCommitments(db, name) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT 
      ROW_NUMBER () OVER ( 
        ORDER BY investor_name
      ) id,
      commitment_asset_class, 
      commitment_currency, 
      commitment_amount
  FROM investors WHERE investor_name = '${name}';`, function(err, rows) {  
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

async function fetchCommitments(name) {
  let db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the in-memory SQlite database.");
  });

  const commitments = await selectCommitments(db, name);
  return commitments;
}

function formatCommitments(commitments) {
  const commitmentAssetClasses = [
    ...new Set(
      commitments.map(commitment => {
        return commitment.commitment_asset_class;
      })
    ),
  ];
  
  /* similar to investments, group all assetClasses into seperate arrays 
    and aggregate the total commitment_amount.
  */
  const commitmentsRemapped = commitmentAssetClasses.map(assetClass => {
    const commitmentRemapArray = [];
    
    commitments.forEach(commitment => {
      if (commitment.commitment_asset_class === assetClass) {
        commitmentRemapArray.push(commitment);
      }
    });

    const commitmentAggregatedArray = [];
  
    const assetClassTotal = commitmentRemapArray.reduce((acc, investor) => {

      return {
        commitment_asset_class: investor.commitment_asset_class,
        commitment_amount:
          Number(acc.commitment_amount) + Number(investor.commitment_amount),
      };
    });

    commitmentAggregatedArray.push(assetClassTotal);
  
    return commitmentAggregatedArray
  });

  /* Add the grand total of all assets as an extra data point for 'All' */
  const assetClassGrandTotal = commitmentsRemapped.flat().reduce((acc, assetClassTotal) => {
    return Number(acc) + Number(assetClassTotal.commitment_amount)
  }, 0);
  commitmentsRemapped.unshift({
    commitment_asset_class: 'All',
    commitment_amount: assetClassGrandTotal
  });

  return commitmentsRemapped.flat()
}

const commitments = async (req, res, next) => {
  let response
    try {
      response = await fetchCommitments(req.params.name)
      // build name of asset class and total commitments obj used for filtering in frontend
      const formattedAssetTotalAmounts = formatCommitments(response);
      const formatedResponse = {
        formattedAssetTotalAmounts,
        commitments: response
      }

      res.json(formatedResponse);
    } catch (e) {
        console.error(e);
        res.sendStatus(500) && next();
    }

};

module.exports = commitments