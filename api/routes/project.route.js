import express from 'express'
import { getAllProjectsController, projectSubmitController, updateProjectStatusController } from '../controllers/project.controller.js';


const router= express.Router();

router.post('/submit', projectSubmitController);
router.get('/getprojects',getAllProjectsController);
router.put('/update/:id/status',updateProjectStatusController);


export default router;