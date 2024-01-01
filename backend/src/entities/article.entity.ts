import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm'
import { Comment } from './comment.entity'
import { User } from './user.entity'

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    body: string

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Comment, comment => comment.article) 
    comments: Comment[]

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column()
    userId: number;

    @JoinTable()
    @ManyToMany(() => User, user => user.liked_articles)
    likes: User[]
}
