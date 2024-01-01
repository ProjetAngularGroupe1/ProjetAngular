import { Injectable } from '@angular/core'
import { UserModel } from '../models/user.model'


@Injectable()
export class MockDataService {
    mockUserList: UserModel[] = [
        new UserModel(0, 'admin', 'password'),
        new UserModel(1, 'Rick' , 'password'),
        new UserModel(2, 'James', 'password'), 
        new UserModel(3, 'Alan' , 'password'),
    ]
}
