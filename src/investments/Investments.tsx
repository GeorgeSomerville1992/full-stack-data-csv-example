import { useInvestments } from "../hooks/useInvestments"
import { formatTotal } from "../utils";
import { Link } from "react-router-dom";
import './Investments.css';
import { type Investor } from "../types/types";

export const Investments = () => {
  const { investments } = useInvestments();

  return (
    <section>
      <h2>Investments</h2>
      <table className='investmentsTable'>
        <thead>
          <tr>
            <th>Id</th> 
            <th>Name</th>
            <th>Type</th>
            <th>Date Added</th>
            <th>Address</th>
            <th>Total commitment</th>
          </tr>
        </thead>
        <tbody>
          {investments.length > 0 && investments.map((investment: Investor) => {
            const {id, investory_type, investor_date_added, investor_country, investor_name} = investment;
            const totalCommitmentFormatted = String(formatTotal(investment.commitment_amount));

            return(
              <tr key={id}>
                <td>{id}</td>
                <td><Link to={`/commitments/${investor_name}`}>{investor_name}</Link></td>
                <td>{investory_type}</td>
                <td>{investor_date_added.toString()}</td>
                <td>{investor_country}</td>
                <td>{parseFloat(totalCommitmentFormatted).toFixed(1) + totalCommitmentFormatted.replace(/[^B|M|K]/g,"")}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  );
}