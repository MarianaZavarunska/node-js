import { getAllUsers } from './notify-user';

export const cronRun = () => {
    console.log('Cron was started');
    getAllUsers();
};
