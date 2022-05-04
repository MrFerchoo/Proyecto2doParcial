import { ChangeEvent, useState, MouseEvent } from "react";
import Juego from '../models/Videojuego';
import axios from "axios";
//import Videojuego from "../models/Videojuego";

export default function CreateJuegoForm() {
  const [id, setId] = useState('');
  console.log('id:', id);
  const[name, setName] = useState('');
  console.log('name:', name);
  const[year, setYear] = useState(0);
  console.log('year:', year);
   


  function handleNameChange(event: ChangeEvent<HTMLInputElement>){
    const newValueForName = event.target.value;
    setName(newValueForName);
  } 
  
  function handleIdChange(event: ChangeEvent<HTMLInputElement>){
    const newValueForId = event.target.value;
    setId(newValueForId);
  }

  function handleYearChange(event: ChangeEvent<HTMLInputElement>){
    const newValueForYear = event.target.value;
    setYear(parseInt(newValueForYear));
  }

  async function handleSave(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault(); //con esto evitaos que el form haga postback
    const JuegoToCreate = new Juego(id, name, year);

    await createJuego(JuegoToCreate);

    clearForm();

    window.alert('Videojuego creado');
    window.location.reload();
}
  
  function clearForm() {
    setId('');
    setName('');
    setYear(0);
  }


  async function createJuego(juegoToCreate: Juego) {
    await axios.post('http://localhost:3001/Games', juegoToCreate, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
  
  
return (
  <form>
      <p className="title">Agregar nuevo juego</p>
      <br />
      <div className="input-box">
      <input type="text" placeholder="ID" value={id} onChange={handleIdChange}/>
      </div>
      <br/>
      <div className="input-box">
      <input type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
      </div>
      <br/>
      <div className="input-box">
      <input type="number" placeholder="Year" value={year} onChange={handleYearChange}/>
      </div>
      
      <button onClick={handleSave} className="button" >Save</button>
  </form>
);
}