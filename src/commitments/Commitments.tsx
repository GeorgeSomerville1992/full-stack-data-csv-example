import { useParams } from 'react-router-dom';
import { useCommitments } from '../hooks/useCommitments';
import { formatTotal } from '../utils';
import './Commitments.css';


export const Commitments = () => {
  const { name } = useParams();
  const { commitmentsObj, filter, handleCommitmentChange, filteredCommitments } = useCommitments({name});
  const { formattedAssetTotalAmounts } = commitmentsObj;

  return (
    <section>
      <h2>Commitments</h2>
      <ul className='totalAmountContainer'>
        {formattedAssetTotalAmounts.length > 0 && formattedAssetTotalAmounts.map((formattedAssetTotalAmount, index) => {
            const {commitment_asset_class, commitment_amount} = formattedAssetTotalAmount;
            const totalCommitmentFormatted = commitment_amount ? formatTotal(commitment_amount) as string : 0;
            return (
              <li key={commitment_asset_class}>
                <button tabIndex={0} onClick={() => {handleCommitmentChange(commitment_asset_class)}}  className={commitment_asset_class === filter ? 'selectedAssetClass' : ''}>
                  <p>{commitment_asset_class}</p>
                  <p>{totalCommitmentFormatted ? parseFloat(totalCommitmentFormatted).toFixed(1) + totalCommitmentFormatted.replace(/[^B|M|K]/g,""): 0}</p>
                </button>
              </li>
            )
          })}
      </ul>

      <table className='commitmentsTable'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Asset Class</th>
            <th>Currency</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredCommitments.length > 0 && filteredCommitments.map((commitment) => {
            const {commitment_asset_class, commitment_currency, commitment_amount, id } = commitment;
            const totalCommitmentFormatted = commitment_amount ? formatTotal(commitment_amount) as string : 0;

            return(
              <tr key={id}>
                <td>{id}</td>
                <td>{commitment_asset_class}</td>
                <td>{commitment_currency}</td>
                <td>{totalCommitmentFormatted ? parseFloat(totalCommitmentFormatted).toFixed(1) + totalCommitmentFormatted.replace(/[^B|M|K]/g,""): 0}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  );
}