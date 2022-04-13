import { NextFunction, Response } from 'express';

import { UploadedFile } from 'express-fileupload';
import { IRequestExtended } from '../../interfaces';
import { constants } from '../../constants/constants';
import { ErrorHandler } from '../../error/error.handler';

class FileMiddleware {
    async checkUserAvatar(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            if (!req.files) {
                next();
                return;
            }

            if (!req.photos) req.photos = [];
            if (!req.videos) req.videos = [];

            Object.entries(req.files).forEach(([_, file]) => {
                const { name, size, mimetype } = Array.isArray(file) ? file[0] : file as UploadedFile;

                if (constants.PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (size <= constants.PHOTO_MAX_SIZE) {
                        req.photos?.push(file);
                    } else {
                        console.log('upload video', req.photos);
                        next(new ErrorHandler(`File ${name} is too big`));
                    }
                } else if (constants.VIDEO_MIMETYPES.includes(mimetype)) {
                    if (size <= constants.VIDEO_MAX_SIZE) {
                        req.videos?.push(file);
                        // console.log('upload video', req.videos)
                    } else {
                        next(new ErrorHandler(`File ${name} is too big`));
                    }
                } else {
                    next(new ErrorHandler(`Format of file ${name} is incorrect `));
                }
            });

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const fileMiddleware = new FileMiddleware();
