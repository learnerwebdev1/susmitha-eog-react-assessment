import { ContactSupportOutlined } from "@material-ui/icons";
import React from "react";
import { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useQuery } from "urql";

const GET_MEASUREMENT_QUERY = `
query ($input: MeasurementQuery){
    getMeasurements (input: $input) {
        at
        value
        metric
        unit
    }
  }
`;

const Measurement = (props) => {
  const [measurement, setMeasurement] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState(props.selectedMetric);

  const [result] = useQuery(
    {
      query: GET_MEASUREMENT_QUERY,
      variables: {
        input: {
          metricName: selectedMetric,
          after: props.last30Minutes,
        },
      },
    },
    [selectedMetric]
  );

  useEffect(() => {
    const { data, fetching, error } = result;
    if (fetching) console.log(fetching);
    if (error) console.log(error);
    if (!data) return "No Data!";

    setMeasurement(data.getMeasurements);
  }, [result, setMeasurement]);

  return (
    <div>
      <LineChart width={800} height={400} data={measurement}>
        <XAxis dataKey="at" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line dataKey="value" stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default Measurement;
