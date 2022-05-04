export default class Videojuego {
  public id: string;

  public name: string;

  public year: number;

  constructor(id: string, name: string, year: number) {
    this.id = id;
    this.name = name; 
    this.year = year;
  }
}