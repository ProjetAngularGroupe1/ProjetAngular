import { Injectable } from '@angular/core'

@Injectable()
export class LocalStorageService {
    constructor() {}

    public saveData(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    public getData(key: string): any {
        return JSON.parse(localStorage.getItem(key)!)
    }

    public removeData(key: string) {
        localStorage.removeItem(key)
    }

    public clearData() {
        localStorage.clear()
    }
}
