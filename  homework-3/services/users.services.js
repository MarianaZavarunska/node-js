const fs = require('fs').promises;

const usersPath = '/Users/marianazavarynska/Desktop/OKTEN/node-js/ homework-3/db/users.json';

const usersService = {
    readFile: async () => {
        const data = await fs.readFile(usersPath);
        return JSON.parse(data.toString());
    },
    overWriteFile: async (newUsers) => {

        await fs.writeFile(usersPath, JSON.stringify(newUsers));
        // const data = await fs.readFile(usersPath);
        // JSON.parse(data.toString());
    }

};

module.exports = usersService;