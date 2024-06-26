
import BarsDataset from '../components/ChartComponent';
import Layout from '../components/Layout';
const Dashboard = () => {
  return (
    <Layout title='Dashboard'>
      <div className='mt-[85px] ml-4'>
        <div className='mb-6'>
        <div className='flex '>
      <div className='h-24 w-64  ml-6 pl-4 border-2 rounded-l-[6px] rounded-r-[6px] mt-3     border-l-[6px] border-l-blue-500 flex flex-col p-2' style={{backgroundColor:"white"}} >
              <p className='mb-1 text-l text-gray-600'>Total Projects</p>
              <p className='text-4xl font-semibold  ' >8</p>
      </div>
      <div className='h-24 w-64  ml-6 pl-4 border-2 rounded-l-[6px] rounded-r-[6px] mt-3     border-l-[6px] border-l-blue-500 flex flex-col p-2' style={{backgroundColor:"white"}} >
              <p className='mb-1 text-l text-gray-600'>Closed</p>
              <p className='text-4xl font-semibold  ' >4</p>
      </div>
      <div className='h-24 w-64  ml-6 pl-4 border-2 rounded-l-[6px] rounded-r-[6px] mt-3     border-l-[6px] border-l-blue-500 flex flex-col p-2' style={{backgroundColor:"white"}} >
              <p className='mb-1 text-l text-gray-600'>Running</p>
              <p className='text-4xl font-semibold  ' >10</p>
      </div>
      <div className='hidden sm:flex  h-24 w-64  ml-6 pl-4 border-2 rounded-l-[6px] rounded-r-[6px] mt-3     border-l-[6px] border-l-blue-500  flex-col p-2' style={{backgroundColor:"white"}} >
              <p className='mb-1 text-l text-gray-600'>Closure Delay</p>
              <p className='text-4xl font-semibold  ' >2</p>
      </div>
      <div className=' hidden sm:flex h-24 w-64  ml-6 pl-4 border-2 rounded-l-[6px] rounded-r-[6px] mt-3     border-l-[6px] border-l-blue-500  flex-col p-2' style={{backgroundColor:"white"}} >
              <p className='mb-1 text-l text-gray-600'>Cancelled</p>
              <p className='text-4xl font-semibold  ' >4</p>
      </div>
      </div>
        </div>


        <div>
          
        <BarsDataset /> 
        </div>
        
      </div>
      
      
    </Layout>
  )
}

export default Dashboard
