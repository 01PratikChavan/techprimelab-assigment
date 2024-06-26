
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProjectListPage from './pages/ProjectListPage'
import CreateProjectPage from './pages/CreateProjectPage'

function App() {

  return  (
    <div className='bg-white' >
  <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard'   element={<Dashboard/>}/>
          <Route path='/project-list'  element={<ProjectListPage />}/>
          <Route path='/create-project' element={<CreateProjectPage />} />
  </Routes>
    </div>
  )
}

export default App
