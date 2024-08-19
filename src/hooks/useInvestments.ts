import { useEffect, useState } from "react";
import { type Investor } from '../types/types'

export const useInvestments = () => {
  const [investments, setInvestments] = useState<Investor[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/investors')
      .then((data) => data.json())
      .then((json) => {
        setInvestments(json);
      })
  }, []);

  return {
    investments
  }
}
