import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm'
import { Comment } from './comment.entity'
import { User } from './user.entity'
import { IArticle } from "shared"


@Entity()
export class Article implements IArticle {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    body: string

    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Comment, comment => comment.article) 
    comments: Comment[]

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column()
    userId: number;

    @JoinTable()
    @ManyToMany(() => User, user => user.likedArticles)
    likes: User[]
}
