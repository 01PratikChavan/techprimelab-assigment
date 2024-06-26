
import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from 'recharts';

const data = [
  { name: 'STR', Total: 19, Closed: 14, Percentage: '91%' },
  { name: 'FIN', Total: 7, Closed: 6, Percentage: '97%' },
  { name: 'QLT', Total: 9, Closed: 8, Percentage: '92%' },
  { name: 'MAN', Total: 15, Closed: 15, Percentage: '100%' },
  { name: 'STO', Total: 5, Closed: 5, Percentage: '100%' },
  { name: 'HR', Total: 10, Closed: 9, Percentage: '91%' },
];

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
  const entry = data.find(d => d.name === payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={10} dy={16} textAnchor="middle" fill="#000" fontWeight="bold">
        {entry.Percentage}
      </text>
      <text x={0} y={30} dy={16} textAnchor="middle" fill="#000">
        {payload.value}
      </text>
    </g>
  );
};

const renderLegend = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: -20 }}>
    <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
      <svg width="10" height="10">
        <circle cx="5" cy="5" r="5" fill="#0044cc" />
      </svg>
      <span style={{ marginLeft: 5 }}>Total</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <svg width="10" height="10">
        <circle cx="5" cy="5" r="5" fill="#66cc66" />
      </svg>
      <span style={{ marginLeft: 5 }}>Closed</span>
    </div>
  </div>
);

const ChartComponent = () => {
  return (
    <div className='ml-4' >
      <BarChart
        width={600} // Decreased width
        height={400} // Kept height same
        data={data}
        barSize={10}
        barGap={15}
        barCategoryGap="80%" // Increased space between bars
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 70,
        }}
      >
        <XAxis dataKey="name" tick={<XAxisTick />} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Total" fill="#0044cc" radius={[10, 10, 10, 10]} transform="translate(0, -10)">
          <LabelList dataKey="Total" content={CustomLabel} />
        </Bar>
        <Bar dataKey="Closed" fill="#66cc66" radius={[10, 10, 10, 10]} transform="translate(0, -10)">
          <LabelList dataKey="Closed" content={CustomLabel} />
        </Bar>
      </BarChart>
      {renderLegend()}
    </div>
  );
};

export default ChartComponent;



// import { BarChart } from '@mui/x-charts/BarChart';
// import { axisClasses } from '@mui/x-charts/ChartsAxis';

// const dataset = [
//   { category: 'STR', total: 19, closed: 14 },
//   { category: 'FIN', total: 7, closed: 6 },
//   { category: 'QLT', total: 9, closed: 8 },
//   { category: 'MAN', total: 15, closed: 15 },
//   { category: 'STO', total: 5, closed: 5 },
//   { category: 'HR', total: 10, closed: 9 },
// ];

// const chartSetting = {
//   yAxis: [
//     {
//       label: 'Count',
//     },
//   ],
//   width: 400, // Adjust width as needed
//   height: 300,
//   barGap: 1, // Adjust as needed
//   barCategoryGap: '20%', // Decrease space between bars to reduce width
  
//   sx: {
//     [`.${axisClasses.left} .${axisClasses.label}`]: {
//       transform: 'translate(-20px, 0)',
//     },
//   },
// };

// export default function ChartComponent() {
//   return (
//     <BarChart
//       dataset={dataset}
//       xAxis={[{ scaleType: 'band', dataKey: 'category' }]}
//       series={[
//         { dataKey: 'total', label: 'Total', radius: [10, 10, 10, 10], animationDuration: 300 }, // Adjust radius and animation as needed
//         { dataKey: 'closed', label: 'Closed', radius: [10, 10, 10, 10], animationDuration: 300 }, // Adjust radius and animation as needed
//       ]}
//       {...chartSetting}
//     />
//   );
// }
