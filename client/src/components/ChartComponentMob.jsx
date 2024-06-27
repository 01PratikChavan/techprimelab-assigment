import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from "recharts";

// const data = [
//   { name: 'STR', Total: 19, Closed: 14, Percentage: '91%' },
//   { name: 'FIN', Total: 7, Closed: 6, Percentage: '97%' },
//   { name: 'QLT', Total: 9, Closed: 8, Percentage: '92%' },
//   { name: 'MAN', Total: 15, Closed: 15, Percentage: '100%' },
//   { name: 'STO', Total: 5, Closed: 5, Percentage: '100%' },
//   { name: 'HR', Total: 10, Closed: 9, Percentage: '91%' },
// ];

const CustomLabel = ({ x, y, width, value }) => (
  <text
    x={x + width / 2}
    y={y - 20}
    fill="#666"
    textAnchor="middle"
    dominantBaseline="middle"
  >
    {value}
  </text>
);

const XAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={30}
        dy={16}
        className="text-sm"
        textAnchor="middle"
        fill="#000"
      >
        {payload.value}
      </text>
    </g>
  );
};

const renderLegend = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: -20,
      marginBottom: "4px",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", marginRight: 20 }}>
      <svg width="10" height="10">
        <circle cx="6" cy="6" r="5" fill="#0044cc" />
      </svg>
      <span style={{ marginLeft: 5 }}>Total</span>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <svg width="10" height="10">
        <circle cx="5" cy="5" r="5" fill="#66cc66" />
      </svg>
      <span style={{ marginLeft: 5 }}>Closed</span>
    </div>
  </div>
);

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/project/departmentCount");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        const formattedData = result.data.map((item) => ({
          name: item._id,
          Total: item.totalProjects,
          Closed: item.closedProjects,
        }));
        // console.log(formattedData);
        setData(formattedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="ml-1 ">
      <BarChart
        width={300} // Decreased width
        height={400} // Kept height same
        data={data}
        barSize={10}
        barGap={15}
        barCategoryGap="80%" // Increased space between bars
        margin={{
          top: 40,
          right: 30,
          left: 10,
          bottom: 70,
        }}
      >
        <XAxis dataKey="name" tick={<XAxisTick />} data={data} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Total" fill="#0847c7" transform="translate(0, -10)">
          <LabelList dataKey="Total" content={CustomLabel} />
        </Bar>
        <Bar dataKey="Closed" fill="#46e146" transform="translate(0, -10)">
          <LabelList dataKey="Closed" content={CustomLabel} />
        </Bar>
      </BarChart>
      {renderLegend()}
    </div>
  );
};

export default ChartComponent;
