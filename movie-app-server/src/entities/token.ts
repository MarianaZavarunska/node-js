import {
    Column, Entity, JoinColumn, ManyToMany,
} from 'typeorm';

import { config } from '../config/config';
import { CommonFields } from './commonFields';
import { IToken } from '../interfaces';
import { User } from './user';

@Entity('Tokens', { database: config.DB_NAME })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        accessToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToMany(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
