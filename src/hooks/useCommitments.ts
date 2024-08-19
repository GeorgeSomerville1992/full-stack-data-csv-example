import { useEffect, useState } from "react";
import { type FormattedAssetAmount, type Commitment } from "../types/types";


type CommitmentRecord = {
  formattedAssetTotalAmounts: Array<FormattedAssetAmount>,
  commitments: Array<Commitment>
};

export const useCommitments = ({name}: {name?: string}) => {
  const [commitmentsObj, setCommitmentsObj] = useState<CommitmentRecord>({
    commitments: [],
    formattedAssetTotalAmounts: []
  });
  
  const [filter, setFilter] = useState('All');
  const [filteredCommitments, setFilteredCommitments] = useState(commitmentsObj.commitments);

  useEffect(() => {
    fetch(`http://localhost:8080/api/commitments/${name}`)
      .then((data) => data.json())
      .then((json) => {
        setCommitmentsObj(json);
        setFilteredCommitments(json.commitments)
      })
  }, [name]);

  const handleCommitmentChange = (filter:string) => {
    setFilter(filter);

    if(filter === 'All') {
      setFilteredCommitments(commitmentsObj.commitments);
      return
    }

    const commitmentFiltered = commitmentsObj.commitments.filter((commitment: Commitment) => {
      return commitment.commitment_asset_class === filter
    });

    setFilteredCommitments(commitmentFiltered);
  }

  return {
    commitmentsObj,
    filteredCommitments,
    handleCommitmentChange,
    filter
  }
}
