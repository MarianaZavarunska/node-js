import {
    Column, Entity, ManyToOne, JoinColumn,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';

export interface IPost {
    title: string,
    content: string,
    userId: number,
}

@Entity('Post', { database: 'Zavarunska' })
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        title:string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        content:string;

    @Column({
        type: 'int',
    })
        userId: number;

   @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
       user: User;
}
