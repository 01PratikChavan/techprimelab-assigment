import { useLocation, useNavigate } from 'react-router-dom';
import dashboard from '../assets/Dashboard.svg'
import dashboardActive from '../assets/Dashboard-active.svg'
import projectListActive from '../assets/Project-list-active.svg'
import createProject from '../assets/create-project.svg'
import listProject from '../assets/Project-list.svg'
import listProjectActive from '../assets/create-project-active.svg'
import logoutIcon from '../assets/Logout_.svg'




const Footer = () => {



    const navigate=useNavigate();
    const location = useLocation();
    const path = location.pathname;
    

    const handlePageClick=(page)=>{
      navigate(page);
      
    }

    const handleLogout=()=>{
      localStorage.removeItem('token');
      navigate('/login');
    }


  return (
    <>
    <footer className='sm:hidden fixed  bottom-0 left-0 right-0 z-10 bg-gray-100  flex flex-row gap-6 w-full px-[43px]  justify-between items-center border border-t-4 border-gray-200 rounded-3xl rounded-b-none   '>
          <div className='py-2 pt-4 ' >
          <img src={path==='/dashboard'?dashboardActive:dashboard}  alt='dashboard' className='w-8 h-8'
           onClick={()=>{handlePageClick('/dashboard')}}
           />
           <p className={`${path==='/dashboard'?'visible':'invisible' } border-t-8 rounded-full border-blue-500 h-2 `}></p> 
      
          </div>
          <div className='py-2 pt-4'>
          <img src={path==='/create-project'?listProjectActive:createProject} alt='create-project' className='w-8 h-8 '
         onClick={()=>{handlePageClick('/create-project')}}
         />
           <p className={`${path==='/create-project'?'visible':'invisible'}  border-t-8 rounded-full border-blue-500 h-2 `}></p> 
           </div>
          <div className='py-2 pt-4'>
          <img  src={ path==='/project-list'?projectListActive:listProject} alt='project-list' className=' w-8 h-8 py-1'
       onClick={()=>{handlePageClick('/project-list')}}
       />
           <p className={`${path==='/project-list'?'visible':'invisible'}  border-t-8 rounded-full border-blue-500 h-2 `}></p>
          </div>

        </footer>







        {/* //dwsktop screen */}



        <footer className='hidden bg-white  shadow-2xl pr-5 h-[88vh] rouded-b-lg justify-center sm:flex flex-col items-center sm:fixed sm:items-center  sm:z-1   '>
          
          <div className={`${path==='/dashboard'?'border-l-4':''}  my-3 mt-10 rounded-sm  border-blue-700`} >

          <img src={path==='/dashboard'?dashboardActive:dashboard}   alt='dashboard' className='w-7 h-8 ml-3 cursor-pointer '
           onClick={()=>{navigate('/dashboard')}}
           />

           
      
          </div>

          
          <div className={` ${path==='/create-project'?'border-l-4':""} my-3 mt-4 rounded-sm  border-blue-700` }>
          <img src={path==='/create-project'?listProjectActive:createProject} alt='create-project' className='w-7 h-8 ml-3 cursor-pointer'
         onClick={()=>{navigate('/create-project')}}
         />
          
           </div>

           <div className='pl-3 py-2'>
          <hr className='border-gray-300 border-2 w-8 ' />
                </div>

                <div className={`${path==='/project-list'?'border-l-4':''}  my-3 mt-6 rounded-sm  border-blue-700`} >


          <img  src={ path==='/project-list'?projectListActive:listProject} alt='project-list' className=' w-7 h-8 ml-3  cursor-pointer '
       onClick={()=>{navigate('/project-list')}}
       />
         
          </div>

          <div className='relative '>
          <img
          src={logoutIcon}
          onClick={handleLogout}
          alt="backArrow"
          className="text-gray-800 cursor-pointer w-10  fixed top-[78%] left-2 sm:pr-[12px] ml-1"
          />
          </div>

        </footer>
       </>

  )
}

export default Footer
