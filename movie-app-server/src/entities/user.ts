import { Column, Entity } from 'typeorm';

import { config } from '../config/config';
import { IUserEntity } from '../interfaces';
import { CommonFields } from './commonFields';

@Entity('Users', { database: config.DB_NAME })
export class User extends CommonFields implements IUserEntity {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'int',
    })
        age: number;

    @Column({
        type: 'varchar',
        width: 255,
        unique: true,
        nullable: false,
    })
        phone: string;

    @Column({
        type: 'varchar',
        width: 255,
        unique: true,
        nullable: false,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        password: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        avatar: string;
}
