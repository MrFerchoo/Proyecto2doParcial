

type InfoVideojuego = {
  name: string,
  year: number,
  
}

export default function Juego (props: InfoVideojuego) {
  

    

  return <p> {props.name} es un juego que salio en el {props.year}</p>;
  
  
  
    
  }
  



 
 








