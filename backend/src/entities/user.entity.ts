import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Article } from './article.entity';
import { Comment } from './comment.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Article, article => article.user) 
    articles: Article[];

    @OneToMany(type => Comment, comment => comment.user) 
    comments: Comment[];
}
