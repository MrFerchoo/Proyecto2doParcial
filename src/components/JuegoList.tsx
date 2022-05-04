import { useState, useEffect } from 'react';
import axios from 'axios';
import Person from '../models/Videojuego';
import InfoVideojuego from './InfoVideojuego';

export default function PersonList() {
  const [juego, setJuego] = useState<Person[]>([]);
  const [ Loaded, SetLoaded ] = useState<boolean>(false);

async function LoadJuego() {
  const response = await axios.get('http://localhost:3001/Games');
  setJuego (
    response.data.map((p: Person) => new Person(p.id, p.name, p.year))
  );
  SetLoaded(true);
}
  

useEffect(() => {
  if (!Loaded) {
    
   LoadJuego();
  }
}, [juego,Loaded]);

//Aqui necesitamos poner el atributo "key"
const renderPeople = () => juego.map(p => (
  <><InfoVideojuego
  key={p.id}
  name={p.name}
  year={p.year} /><form>
    <button className='buttonEliminar' onClick={
      async function Delete(){
        await axios.delete('http://localhost:3001/Games/'+p.id);
        window.alert('Juego eliminado!');
        window.location.reload();
      }
    }>Eliminar</button>
    </form></>
));



 return (
 
 <div>
   {renderPeople()}
   </div>
 )
 
 
}
