import { ChangeEvent, useState, MouseEvent } from "react";
import Juego from '../domain-layer/entities/Videojuego';
import axios from "axios";
//import Videojuego from "../models/Videojuego";

export default function EditJuegoForm() {
  const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [year, setYear] = useState(0);
   


    function handleIdChange(event: ChangeEvent<HTMLInputElement>){
      const newValueForId = event.target.value;
      console.log(newValueForId);
      setId(newValueForId);
      loadJuego(newValueForId);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>){
      const newValueForName = event.target.value;
      console.log(newValueForName);
      setName(newValueForName);
  }

  function handleYearChange(event: ChangeEvent<HTMLInputElement>){
      const newValueForYear = event.target.value;
      console.log(newValueForYear);
      setYear(parseInt(newValueForYear));
  }

  async function handleEdit(this: any, event: MouseEvent<HTMLButtonElement>){
    event.preventDefault(); //con esto evitaos que el form haga postback
    console.log(id, name, year);
    const juegoToEdit = new Juego(id, name, year);
    await editJuego(juegoToEdit);
    clearForm();
    window.alert('Game modificated!');
    window.location.reload();
}

async function editJuego(juegoToEdit: Juego) {
  await axios.put('http://localhost:3001/Games', juegoToEdit, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
}

async function loadJuego(id: string) {
  const response = await axios.get('http://localhost:3001/Games/' + id);
  
  console.log(response, );
  //response.data.map((p: Person) => new Person(p.id, p.name, p.age))
  setName(response.data.name);
  setYear(parseInt(response.data.year));

  //console.log(id, response.data.name, response.data.year);
}
  
  function clearForm() {
    setId('');
    setName('');
    setYear(0);
  }
  
  
  return (
    <form>

        <p className="title">Edit a game</p>
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
        <br/>
        <button onClick={handleEdit} className="button">Edit</button>
    </form>
);
}