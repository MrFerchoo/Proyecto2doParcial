import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Videojuego from './Videojuego';

@Entity()
export default class Inventario {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, zerofill: true })
  public id: number;

  @ManyToOne(() => Videojuego)
  @JoinColumn()
  public videojuego: Videojuego;

  @Column({ type: 'smallint', nullable: false })
  public quantity: number;

  @Column({ type: 'datetime', nullable: false})
  public date: Date;

  public constructor(id: number, videojuego: Videojuego, quantity: number, date: Date) {
    this.id = id;
    this.videojuego = videojuego;
    this.quantity = quantity;
    this.date = date;
  }
}