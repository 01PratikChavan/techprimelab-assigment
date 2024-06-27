import Layout from "../components/Layout";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Card from "../components/Card";
import ProjectsTable from "../components/ProjectsTable";
import { useState, useEffect } from "react";
import SortIcon from "@mui/icons-material/Sort";

const ProjectListPage = () => {
  const [projectData, setProjectData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showSortOption, setShowSortOption] = useState(false);
 
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project/getprojects");
        const data = await response.json();
        setProjectData(data.projects);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      const response = await fetch(`/api/project/update/${projectId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedProjects = projectData.map((project) =>
          project._id === projectId
            ? { ...project, status: newStatus, updatedAt: new Date() }
            : project
        );
        setProjectData(updatedProjects);
      } else {
        console.error("Error updating project status:", await response.text());
      }
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredProjects = projectData
    .filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortOption === "status") {
        return a.status.localeCompare(b.status);
      }
      if (sortOption === "startDate") {
        return new Date(a.startDate) - new Date(b.startDate);
      }
      if (sortOption === "endDate") {
        return new Date(a.endDate) - new Date(b.endDate);
      }
      if (sortOption === "updatedAt") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return 0; // No sorting
    });

  return (
    <Layout title="Project-list">
      {/* Mobile screen */}
      <div
        className={`sm:hidden flex justify-between gap-12 mx-3 relative items-center ${
          showSortOption ? "opacity-60" : ""
        } `}
      >
        <input
          onChange={handleInputChange}
          placeholder="Search"
          className="outline-none bg-transparent border-b-2 px-1 pl-8 py-2 rounded-sm border-gray-600 flex-1"
        />
        <SearchOutlinedIcon className="absolute bottom-0 top-2" />
        <div>
          <SortIcon onClick={() => setShowSortOption(true)} />
        </div>
      </div>

      <div
        className={`sm:hidden pb-[70px] mx-1 ${
          showSortOption ? "opacity-60" : ""
        } `}
      >
        {filteredProjects.map((project) => (
          <Card
            key={project._id}
            project={project}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {showSortOption && (
        <div className="bg-white fixed bottom-0 left-0 right-0 border-[1.5px] border-t-gray-700    z-20 h-[38vh] w-full flex flex-col items-start px-6 py-4   ">
          <div className="flex w-full  items-center justify-between px-[3px] ">
            <p className=" font-semibold  text-2xl mt-1  ">Sort Projects By</p>
            <p
              className="text-center text-[25px] text-gray-600 self-center"
              onClick={() => setShowSortOption(false)}
            >
              X
            </p>
          </div>
          <div className="flex flex-col gap-4 items-start mt-4 pl-1">
            <button
              onClick={() => setSortOption("priority")}
              className="text-lg"
            >
              Priority
            </button>
            <button
              onClick={() => setSortOption("updatedAt")}
              className="text-lg"
            >
              Recently Modified
            </button>
            <button onClick={() => setSortOption("status")} className="text-lg">
              Status
            </button>
            <button
              onClick={() => setSortOption("startDate")}
              className="text-lg"
            >
              Start Date
            </button>
            <button
              onClick={() => setSortOption("endDate")}
              className="text-lg"
            >
              End Date
            </button>
          </div>
        </div>
      )}

      {/* Desktop screen */}
      <div className="hidden sm:flex flex-col justify-center rounded-lg sm:overflow-hidden shadow-2xl bg-white mt-[89px] ml-[22px] border-r-2">
        <div className="relative hidden sm:flex justify-between px-[20px] mb-4 mt-5 bg-white">
          <input
            onChange={handleInputChange}
            placeholder="search"
            className="border-b-2 pl-8 px-5 py-1 outline-none text-md sm:border-gray-300"
          />
          <SearchOutlinedIcon className="sm:absolute bottom-1" />
          <span className="flex-end absolute right-48 top-[6px]" >Sort By</span>
          <select className="mr-2   " onChange={handleSortChange}>
            <option value="priority">Priority</option>
            <option value="updatedAt">Recently Modified</option>
            <option value="status">Status</option>
            <option value="startDate">Start Date</option>
            <option value="endDate">End Date</option>
          </select>

          {/* <button onClick={() => setSortOption('priority')}>Priority</button>
          <button onClick={() => setSortOption('updatedAt')}>Recently Modified</button>
          <button onClick={() => setSortOption('status')}>Status</button>
          <button onClick={() => setSortOption('startDate')}>Start Date</button>
          <button onClick={() => setSortOption('endDate')}>End Date</button> */}
        </div>

        <ProjectsTable
          projects={filteredProjects}
          onStatusChange={handleStatusChange}
        />
      </div>
    </Layout>
  );
};

export default ProjectListPage;
