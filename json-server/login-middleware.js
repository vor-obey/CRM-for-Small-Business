const fs = require('fs');

module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/login') {
        console.log(req.body);
        fs.readFile(__dirname + '/db.json', 'utf8', (err, data) => {
            const user = JSON.parse(data).users.find(({email}) => {
                return email === req.body.email;
            });

            if(!user || user.password !== req.body.password){
                res.status(401).json({ error: 'wrong password' })
            } else {
                res.status(200).json(user)
            }
        });
    } else {
        next()
    }
};
