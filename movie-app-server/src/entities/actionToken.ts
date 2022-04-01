import {
    Column, Entity, JoinColumn, ManyToMany,
} from 'typeorm';

import { config } from '../config/config';
import { CommonFields } from './commonFields';
import { IActionToken } from '../interfaces';
import { User } from './user';
import { ActionTokenTypes } from '../enums/enums';

@Entity('ActionTokens', { database: config.DB_NAME })
export class ActionToken extends CommonFields implements IActionToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        type: ActionTokenTypes;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToMany(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
