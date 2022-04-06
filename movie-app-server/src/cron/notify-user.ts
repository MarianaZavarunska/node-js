import cron from 'node-cron';
import { userRepository } from '../repositories/user/user.repository';
import { emailService } from '../services';
import { EmailTypeEnum } from '../enums/enums';

export const getAllUsers = async () => {
    cron.schedule('*/60 * * * *', async () => {
        console.log('==== New Users ====');
        const users = await userRepository.getAllUsers();

        const usersFromDB = users.map((user) => emailService.sendEmail(
            user.email,
            { firstName: user.firstName },
            EmailTypeEnum.WELCOME,
        ));

        const result = await Promise.all(usersFromDB);
        console.log(result);
    });
};
