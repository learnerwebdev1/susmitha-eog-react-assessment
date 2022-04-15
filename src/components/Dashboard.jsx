/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
//import { useQuery, gql } from "@apollo/client";
import { useQuery } from "urql";
import "./Dashboard.css";
import Measurement from "./Measurement";

const GET_METRICS_QUERY = `
  {
    getMetrics
  }
`;

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("");
  console.log("Dashboard");
  const [result] = useQuery({ query: GET_METRICS_QUERY });
  const { data, fetching, error } = result;
  const [last30Minutes, setLast30Minutes] = useState(0);

  useEffect(() => {
    if (fetching) console.log(fetching);
    if (error) console.log(error);
    if (data) {
      setMetrics(data.getMetrics);
    }
  }, [fetching, data, error]);

  const metricSelectedHandler = (event) => {
    const milliSeconds = new Date() - 30 * 60 * 1000;
    setLast30Minutes(milliSeconds);
    setSelectedMetric(event.target.value);
  };

  return (
    <div>
      <div className="metrics-db">
        <label htmlFor="metric-select">Choose a metric:</label>
        <select
          name="metirc"
          id="metric-select"
          onChange={metricSelectedHandler}
        >
          <option value={""}></option>
          {metrics.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedMetric && (
          <Measurement
            selectedMetric={selectedMetric}
            last30Minutes={last30Minutes}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
