import { Recipe } from "src/recipe/entities/recipe.entity";
import { Column,Entity,PrimaryGeneratedColumn,OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
@Entity({name:"users"})
export class User {
  constructor(data: User) {
    Object.assign(this, data);
  }
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    password: string;
    
    @OneToMany(() => Recipe, recipe => recipe.user)
    // @JoinColumn({ referencedColumnName: 'name' })
    recipes: Recipe[];

    async validatePassword(password:string):Promise<boolean>{return bcrypt.compare(password,this.password)}
    
    
  }