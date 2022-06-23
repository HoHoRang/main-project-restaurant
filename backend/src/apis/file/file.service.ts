import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IFile {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ files }: IFile) {
    const storage = new Storage({
      projectId: process.env.STORAGE_PROJECT_ID,
      keyFilename: process.env.STORAGE_KEY_FILENAME,
    }).bucket(process.env.STORAGE_BUCKET);

    // 일단 먼저 다 받기
    const waitedFiles = await Promise.all(files);

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream() // file을 읽어옴
            .pipe(storage.file(el.filename).createWriteStream()) // storage에 저장하는 단계(pipe는 앞선 결과를 쓸 때 사용함)
            .on('finish', () =>
              resolve(`${process.env.STORAGE_BUCKET}/${el.filename}`),
            )
            .on('error', () => reject());
        });
      }),
    );

    return results;
  }
}
