import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cases } from './pages/Cases';
import { Drones } from './pages/Drones';
import RequestInfo from './pages/RequestInfo';
import { CreateCase } from './pages/CreateCase';

export default function App () {

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/cases' element = {<Cases />} />
        <Route path='/drones' element = {<Drones />} />
        <Route path='/cases/requests/:_id' element = {<RequestInfo />} />
        <Route path='/cases/create' element = {<CreateCase />} />
      </Routes>
    </BrowserRouter>
  )
}