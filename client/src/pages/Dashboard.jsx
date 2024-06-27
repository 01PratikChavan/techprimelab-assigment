// import BarsDataset from '../components/ChartComponent';
import Layout from "../components/Layout";
import ChartComponentMob from "../components/ChartComponentMob";
import ChartComponent from "../components/ChartComponent";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project/counts");
        const data = await response.json();
        setCounts(data.counters);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="sm:mt-[85px] sm:ml-4">
        <div className="mb-12 sm:mb-6">
          <div className="flex items-center ">
            <div
              className="h-24 w-64  ml-6 pl-4  border-2 rounded-l-[6px] rounded-r-[6px] mt-3     border-l-[6px] border-l-blue-500 flex flex-col p-2"
              style={{ backgroundColor: "white" }}
            >
              <p className="mb-1 text-l text-gray-600 w-[100px] ">
                Total Projects
              </p>
              <p className="text-4xl font-semibold  ">{counts.totalProjects}</p>
            </div>
            <div
              className="h-24 w-64  ml-6 pl-4 border-2 rounded-l-[6px] rounded-r-[6px] mt-3     border-l-[6px] border-l-blue-500 flex flex-col p-2"
              style={{ backgroundColor: "white" }}
            >
              <p className="mb-1 text-l text-gray-600">Closed</p>
              <p className="text-4xl font-semibold  ">
                {counts.closedProjects}
              </p>
            </div>
            <div
              className="h-24 w-64  ml-6 pl-4 border-2 rounded-l-[6px] rounded-r-[6px] mt-3     border-l-[6px] border-l-blue-500 flex flex-col p-2"
              style={{ backgroundColor: "white" }}
            >
              <p className="mb-1 text-l text-gray-600">Running</p>
              <p className="text-4xl font-semibold  ">
                {counts.runningProjects}
              </p>
            </div>
            <div
              className="hidden sm:flex  h-24 w-64  ml-6 pl-4 border-2 rounded-l-[6px] rounded-r-[6px] mt-3     border-l-[6px] border-l-blue-500  flex-col p-2"
              style={{ backgroundColor: "white" }}
            >
              <p className="mb-1 text-l text-gray-600">Closure Delay</p>
              <p className="text-4xl font-semibold  ">
                {counts.closureDelayProjects}
              </p>
            </div>
            <div
              className=" hidden sm:flex h-24 w-64  ml-6 pl-4 border-2 rounded-l-[6px] rounded-r-[6px] mt-3     border-l-[6px] border-l-blue-500  flex-col p-2"
              style={{ backgroundColor: "white" }}
            >
              <p className="mb-1 text-l text-gray-600">Cancelled</p>
              <p className="text-4xl font-semibold  ">
                {counts.cancelledProjects}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="sm:hidden">
            <ChartComponentMob />
          </div>
          <div className="hidden  sm:flex">
            <ChartComponent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
