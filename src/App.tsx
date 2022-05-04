import React from 'react';
import './App.css';
import PersonList from './components/JuegoList';
import CreatePersonForm from './components/CreateJuegoForm';
import EditPerson from './components/EditJuegoForm';



//componente raiz
// se esta pasando una propiedad con las llaves {}
function App() {
  return (
    <div className="App">
      <br />
      <br />
      <div className='container'>
      <PersonList/>
      <br />
      <CreatePersonForm/>
      <br />
      <EditPerson/>
    </div>
    <br />
    <br />
    </div>
  );
}

export default App;
