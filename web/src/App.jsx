import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import { Courses, EnrollmentDetails, Enrollments, Home, RegisterEnrollment, StudentDetails, Students} from './Pages';
import { Navbar } from './Components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'alunos',
    element: <Students />
  },
  {
    path: 'alunos/:id',
    element: <StudentDetails />
  },
  {
    path: 'cursos',
    element: <Courses />
  },
  {
    path: 'matriculas',
    element: <Enrollments />
  },
  {
    path: 'matriculas/:id',
    element: <EnrollmentDetails />
  },
  {
    path: 'matriculas/registro',
    element: <RegisterEnrollment />
  },
])

function App() {
  return (
    <div className="App px-2 py-1 px-md-0">
      <header className='container-fluid'>
        <Navbar />
      </header>

      <main id="main" className='container-sm'>
        <RouterProvider router={ router }/>
      </main>
    </div>
  );
}

export default App;
