import React, {useState, useEffect} from 'react'
import {DisplayCampaign} from '../components';

import { useStateContext } from '../context';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState ([]);

  const {address, contract, getCampaigns} = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }
  
  useEffect (() => {
    if (contract) fetchCampaigns();
  }, [address, contract ]);
  return (
    <div>
      <DisplayCampaign
        title = "All Campaigns"
        isLoading = {isLoading}
        campaigns = {campaigns}
      />
    </div>
  );
};

export default Home
