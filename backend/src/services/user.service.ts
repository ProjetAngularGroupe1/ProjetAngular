import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { Article } from '../entities/article.entity'
import { Comment } from '../entities/comment.entity'

@Injectable()
export class UserService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id : id })
    }

    async findAllArticlesById(id: number): Promise<Article[]> {
        const user = await this.userRepository.findOne({
            where: { id : id },
            relations: ['articles'],
        })
        return user.articles
    }

    async findAllCommentsById(id: number): Promise<Comment[]> {
        const user = await this.userRepository.findOne({
            where: { id : id },
            relations: ['comments'],
        })
        return user.comments
    }

    async findAllLikedArticlesById(id: number): Promise<Article[]> {
        // TODO: why doesn't this work ?
        // const user = await this.userRepository.findOne({
        //     where: { id : id },
        //     relations: ['likedArticles'],
        // })
        // return user.likedArticles

        const ids: any[] = await this.dataSource.query(`SELECT articleId FROM article_likes_user WHERE userId = ${ id };`)
        
        let likedArticles: Article[] = []
        for (const id of ids) {
            const article = await this.dataSource.getRepository(Article).findOneBy({ id : id.articleId })
            likedArticles.push(article)
        }

        return likedArticles
    }

    async findAllLikedCommentsById(id: number): Promise<Comment[]> {
        // TODO: why doesn't this work ?
        // const user = await this.userRepository.findOne({
        //     where: { id : id },
        //     relations: ['comments'],
        // })
        // return user.comments

        const ids: any[] = await this.dataSource.query(`SELECT commentId FROM comment_likes_user WHERE userId = ${ id };`)
        
        let likedComments: Comment[] = []
        for (const id of ids) {
            const comment = await this.dataSource.getRepository(Comment).findOneBy({ id : id.commentId })
            likedComments.push(comment)
        }

        return likedComments
    }
}
