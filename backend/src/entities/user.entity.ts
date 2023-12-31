import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm'
import { Article } from './article.entity'
import { Comment } from './comment.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @OneToMany(() => Article, article => article.user) 
    articles: Article[]

    @OneToMany(() => Comment, comment => comment.user) 
    comments: Comment[]
    
    @ManyToMany(() => Article, article => article.likes)
    liked_articles: Article[]
    
    @ManyToMany(() => Comment, comment => comment.likes)
    liked_comments: Comment[]
}
