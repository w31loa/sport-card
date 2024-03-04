import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs'

@Injectable()
export class FilesService {
    async createFile(file , userLogin):Promise<string>{
        console.log(path.resolve(__dirname, '..', 'static'))
        try{
            const fileName = userLogin + '.jpg'
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)) { 
                fs.mkdirSync(filePath, {recursive: true}) 
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;

        }catch(e){
            console.log(e)
            throw new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
