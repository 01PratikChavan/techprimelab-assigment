
import backArrow from '../assets/back_arrow.svg';
import logoutIcon from '../assets/Logout.svg';

const Layout = (props) => {
  return (
    <>
        <div  className="bg-headerbg bg-no-repeat h-16 bg-left-bottom bg-cover flex justify-between items-center opacity-90 " >
           
            <div className='flex items-center justify-between gap-4 ml-7'>
 
            <img  src={backArrow} alt="backArrow" className=' cursor-pointer w-[11px] mr-2' />
            <h1 className="text-white text-2xl font-roboto" >Create Project </h1>
            </div>

            <img  src={logoutIcon} alt="backArrow" className=' cursor-pointer w-6 mr-6' />


        </div>

        <main className=' overflow-scroll '>
      {props.children}
        </main>

        <footer className=' fixed bottom-0 h-8'>
          <img   />
          <img />
          <img />

        </footer>
    </>
  )
}

export default Layout
