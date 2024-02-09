import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { Article } from '../entities/article.entity'
import { Comment } from '../entities/comment.entity'
import { IUserLoginDto, IUserGetDto } from 'shared'

@Injectable()
export class UserService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<IUserGetDto[]> {
        const users = await this.userRepository.find()
        return users as IUserGetDto[]
    }

    async findOneById(id: number): Promise<IUserGetDto> {
        const user =  await this.userRepository.findOneBy({ id : id })
        return { id : user.id, username : user.username } as IUserGetDto
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

    async logIn(username: string, password: string): Promise<IUserLoginDto | void> {
        const user = await this.userRepository.findOne({
            where: { 
                username : username,
                password : password,
            },
        })
        
        if (user) {
            return {
                id       : user.id,
                username : user.username,
                jwt      : "token",
            }
        } 
    }

    async signIn(username: string, password: string): Promise<boolean> {
        const result = await this.userRepository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({ 
                username: username, 
                password: password, 
            })
            .execute()

        if (result) {
            return true;
        } else {
            return false;
        }
    }
}
