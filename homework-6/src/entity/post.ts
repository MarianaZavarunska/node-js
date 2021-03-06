import {
    Column, Entity, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';
import { Comment } from './comments';
import { config } from '../config/config';

export interface IPost {
    title: string,
    content: string,
    userId: number,
    comments: any[],
}

@Entity('Posts', { database: config.MYSQL_DATABASE_NAME })
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

   @OneToMany(() => Comment, (comment) => comment.post)
       comments: Comment[];
}
