import projectModel from "../models/project.model.js";

export const projectSubmitController=async(req,res)=>{
 
    try{
   
       const {name,reason,type,division,category,priority,department,startDate ,location, endDate,status}=req.body;
       const project = new projectModel({ name,reason,type,division,category, department,location, priority,startDate,endDate,status});
       await project.save();

    
       res.status(200).send({
           success: true,
           message: 'project saved success',
           project
       })        
   
    }catch(err){
       console.log(err);
       res.status(500).send({
           success:false,
           message:'Internal Server Error',
           error:err.message
       })
    }
        
   }


   export const getAllProjectsController=async(req,res)=>{
     try{

        const projects = await projectModel.find();
        res.status(200).send(({
            success:true,
            message:'projects fetched successfully',
            projects
        }))

     }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:'Internal Server Error',
            error:err.message
        })};      
     
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
  
 
export default {projectSubmitController,getAllProjectsController,updateProjectStatusController}