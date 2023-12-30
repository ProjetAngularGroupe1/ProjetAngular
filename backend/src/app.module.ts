import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleModule } from './modules/article.module'
import { CommentModule } from './modules/comment.module'
import { UserModule } from './modules/user.module'
import { join } from 'path'

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../database/database.db',
      synchronize: true,
      logging: false,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    ArticleModule, CommentModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
