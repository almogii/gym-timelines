import { Column,Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar', nullable: true })
    maidenName?: string;

    @Column({ type: 'int', nullable: true })
    age?: number;

    @Column({ type: 'varchar', nullable: true })
    gender?: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    phone?: string;

    @Column({ type: 'varchar', nullable: true })
    username?: string;

    @Column({ type: 'varchar', nullable: true })
    password: string;

    @Column({ type: 'varchar', nullable: true })
    birthDate?: string;

    @Column({ type: 'varchar', nullable: true })
    image?: string;

    @Column({ type: 'varchar', nullable: true })
    bloodGroup?: string;

    @Column({ type: 'int', nullable: true })
    height?: number;

    @Column({ type: 'int', nullable: true })
    weight?: number;

    @Column({ type: 'varchar', nullable: true })
    eyeColor?: string;

    @Column({ type: 'json', nullable: true })
    hair?: { color?: string; type?: string };

    @Column({ type: 'varchar', nullable: true })
    domain?: string;

    @Column({ type: 'varchar', nullable: true })
    ip?: string;

    @Column({ type: 'json', nullable: true })
    address?: { address?: string; city?: string; coordinates?: { lat?: number; lng?: number }; postalCode?: string; state?: string };

    @Column({ type: 'varchar', nullable: true })
    macAddress?: string;

    @Column({ type: 'varchar', nullable: true })
    university?: string;

    @Column({ type: 'json', nullable: true })
    bank?: { cardExpire?: string; cardNumber?: string; cardType?: string; currency?: string; iban?: string };

    @Column({ type: 'json', nullable: true })
    company?: { address?: { address?: string; city?: string; coordinates?: { lat?: number; lng?: number }; postalCode?: string; state?: string }; department?: string; name?: string; title?: string };

    @Column({ type: 'varchar', nullable: true })
    ein?: string;

    @Column({ type: 'varchar', nullable: true })
    ssn?: string;

    @Column({ type: 'varchar', nullable: true })
    userAgent?: string;

    @Column({ type: 'json', nullable: true })
    crypto?: { coin?: string; wallet?: string; network?: string };
    
    constructor(data: User) {
      Object.assign(this, data);
    }
   
  }