const fs = require('fs').promises;

const getTalkers = async () => {
    const result = await fs.readFile('./talker.json', 'utf-8');
    const talkers = JSON.parse(result);
    return talkers;
};

module.exports = getTalkers;