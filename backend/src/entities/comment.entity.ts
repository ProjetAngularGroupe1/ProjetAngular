import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm'
import { Article } from './article.entity'
import { User } from './user.entity'

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    body: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Article, article => article.comments)
    @JoinColumn({ name: 'articleId' })
    article: Article

    @Column()
    articleId: number;
    
    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column()
    userId: number;

    @JoinTable()
    @ManyToMany(() => User, user => user.liked_comments)
    likes: User[]
}