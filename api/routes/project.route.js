import express from 'express'
import { getAllProjectsController, getCountersController, projectSubmitController, updateProjectStatusController, getDepartmentProjects } from '../controllers/project.controller.js';


const router = express.Router();

router.post('/submit', projectSubmitController);
router.get('/getprojects', getAllProjectsController);
router.put('/update/:id/status', updateProjectStatusController);
router.get('/counts', getCountersController);
router.get('/departmentCount', getDepartmentProjects);


export default router;