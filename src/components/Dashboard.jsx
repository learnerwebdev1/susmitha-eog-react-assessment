/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './Dashboard.css';

const query = gql`
  query {
    getMetrics
  }
`;

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const { error, loading, data } = useQuery(query);

  // let options = '';

  useEffect(() => {
    // get metrics state data from redux store
    if (loading) console.log(loading);
    if (error) console.log(error);
    if (data) {
      setMetrics(data.getMetrics);
    }
  }, [loading]);

  return (
    <div>
      <div className="metrics-db">
        <label htmlFor="metric-select">Choose a metric:</label>
        <select name="metirc" id="metric-select">
          {metrics.map((val) => (
            <option value={val}>{val}</option>
          ))}
        </select>
      </div>
      <div>{}</div>
    </div>
  );
};

export default Dashboard;
