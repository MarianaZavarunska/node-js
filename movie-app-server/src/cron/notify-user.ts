import cron from 'node-cron';
import { userRepository } from '../repositories/user/user.repository';
import { emailService } from '../services';
import { EmailTypeEnum } from '../enums/enums';

export const getAllUsers = async () => {
    cron.schedule('*/60 * * * *', async () => {
        console.log('==== New Users ====');
        const users = await userRepository.getAllUsers();

        const usersFromDB = users.map((user, i, arr) => emailService.sendEmailGeneric(
            user.email,
            { firstName: user.firstName, amount: arr.length, template: 'email' },
            EmailTypeEnum.WELCOME,
        ));

        // ==== 1 ====

        // await Promise.all(usersFromDB)
        //     .catch((err) => {
        //         console.log(err.message);
        //     })
        //     .then((res) => {
        //         console.log('================ result==============');
        //         console.log(res);
        //         return res;
        //      });

        // ==== 2 ====

        const results = await Promise.all(usersFromDB.map((user) => user.catch((e) => e)));
        const validResults = results.filter((result) => !(result instanceof Error));

        console.log('====== validResults ====== ');
        console.log(validResults);
    });
};
