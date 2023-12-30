import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { Article } from './article.entity'
import { User } from './user.entity'

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    body: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => Article, article => article.comments)
    article: Article
    
    @ManyToOne(() => User, user => user.comments)
    user: User

    @JoinTable()
    @ManyToMany(() => User, user => user.liked_comments)
    likes: User[]
}