import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Videojuego {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, zerofill: true })
  public id: number;

  @Column({ type: 'varchar', length: 16, nullable: false })
  public name: string;

  @Column({ type: 'varchar', length: 16, nullable: false })
  public year: string;

  public constructor(id: number, name: string, year: string) {
    this.id = id;
    this.name = name;
    this.year = year;
  }
}