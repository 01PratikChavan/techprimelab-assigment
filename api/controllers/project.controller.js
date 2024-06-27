import projectModel from "../models/project.model.js";

export const projectSubmitController = async (req, res) => {

  try {

    const { name, reason, type, division, category, priority, department, startDate, location, endDate, status ,project_manager } = req.body;
    const project = new projectModel({ name, reason, type, division, category, department, location, priority, startDate, endDate, status ,project_manager  });
    await project.save();


    res.status(200).send({
      success: true,
      message: 'project saved success',
      project
    })

  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
      error: err.message
    })
  }

}


export const getAllProjectsController = async (req, res) => {
  try {

    const projects = await projectModel.find();
    res.status(200).send(({
      success: true,
      message: 'projects fetched successfully',
      projects
    }))

  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
      error: err.message
    })
  };

}

export const updateProjectStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Registered', 'Running', 'Closed', 'Cancelled'].includes(status)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid status',
      });
    }

    const project = await projectModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!project) {
      return res.status(404).send({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Project status updated successfully',
      project,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};


export const getCountersController = async (req, res) => {
  try {

    const currentDate = new Date();

    const totalProjects = await projectModel.countDocuments();

    const closedProjects = await projectModel.countDocuments({ status: "Closed" });

    const runningProjects = await projectModel.countDocuments({ status: "Running" });

    const cancelledProjects = await projectModel.countDocuments({ status: "Cancelled" });

    const closureDelayProjects = await projectModel.countDocuments({
      status: "Running",
      endDate: { $lt: currentDate }
    });

    res.status(200).send({
      success: true,
      message: 'Counters  fetched',
      counters: {
        totalProjects,
        closedProjects,
        runningProjects,
        cancelledProjects,
        closureDelayProjects
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
      error: err.message
    });
  }
}

export const getDepartmentProjects = async (req, res) => {
  try {

    const data = await projectModel.aggregate([
      {
        $group: {
          _id: "$department",
          totalProjects: { $sum: 1 },
          closedProjects: { $sum: { $cond: [{ $eq: ["$status", "Closed"] }, 1, 0] } }
        }
      }
    ]);
    res.status(200).send({
      success: true,
      message: 'Department Projects fetched',
      data
    })

  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
      error: err.message
    });

  }
}


export default { getDepartmentProjects, projectSubmitController, getAllProjectsController, updateProjectStatusController }