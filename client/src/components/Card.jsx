const Card = ({ project, onStatusChange }) => {
  const formattedStartDate = new Date(project.startDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const formattedEndDate = new Date(project.endDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
  return (
    <div className="shadow-2xl px-[14px] py-4 rounded-lg flex flex-col bg-white mt-3 sm:flex-row">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col gap-4 ml-1 sm:flex-row">
          <div>
            <p className=" text-[20px] text-gray-700 font-semibold">
              {project.name}
            </p>
            <p className="text-gray-500">
              {formattedStartDate} to {formattedEndDate}
            </p>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row">
            <p className="text-md">
              <span className="text-gray-700">Reason: </span>
              {project.reason}
            </p>
            <p className="text-md">
              <span className="text-gray-700">Project Manager : </span>
              {project.project_manager}
            </p>
            <div className="flex justify-center  gap-3">
              <p className="text-md">
                <span className="text-gray-500">Type: </span>
                {project.type}
              </p>
              <p className="text-md">
                <span className="text-gray-500">Category: </span>
                {project.category}
              </p>
            </div>
            <div className="flex self-start justify-center  gap-3">
              <p className="text-md">
                <span className="text-gray-500">Div: </span>
                {project.division}
              </p>
              <p className="text-md">
                <span className="text-gray-500">Dept: </span>
                {project.department}
              </p>
            </div>
            <p className="text-md">
              <span className="text-gray-500">Location: </span>
              {project.location}
            </p>
            <p className="text-md">
              <span className="text-gray-500">Priority: </span>
              {project.priority}
            </p>
          </div>
        </div>
        <div className="text-center flex flex-col justify-center self-start mt-[2px] font-semibold">
          <p className="font-semibold text-[16px]">{project.status}</p>
        </div>
      </div>

      <div className="flex  mx-2 gap-4 mt-4 sm:mt-0 sm:ml-8">
        <button
          className="px-7 py-1 text-white text-md bg-blue-600 rounded-3xl"
          onClick={() => onStatusChange(project._id, "Running")}
        >
          Start
        </button>
        <button
          className="px-6 py-[8px]   text-blue-500 text-md rounded-3xl bg-white border border-blue-500"
          onClick={() => onStatusChange(project._id, "Closed")}
        >
          Close
        </button>
        <button
          className="px-6 py-1 rounded-3xl text-blue-500 text-md bg-white border border-blue-500"
          onClick={() => onStatusChange(project._id, "Cancelled")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Card;
