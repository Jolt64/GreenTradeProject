const bcrypt = require('bcryptjs');


module.exports = {

// Register User
    register: async (req, res) => {
        const { user_firstName, user_lastName, user_userName, user_email, password, user_zip, user_img } = req.body        
        const db = req.app.get('db');
        const user = await db.find_user_by_email(user_email);
        if(user[0]){
            return res.status(404).send({message: 'Email has been taken'})
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync( password, salt);
        let newUser = await db.create_user([user_firstName, user_lastName, user_userName, user_email, hash, user_zip, user_img])
        req.session.userData = {...newUser[0]}
        console.log(newUser);
        
        res.status(200).send({
            message: 'User created successfully',
            loggedIn: true,
            userData: req.session.userData
        })
    },

// Retrieve User Data
    userData: async (req, res) => {
        // console.log(req.session.userData, 'hit1');

        if(req.session.userData) res.status(200).send({userData: req.session.userData})
        else res.status(404).send({message: 'Please log in'})
    },

// Logout
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send({message: 'Logged Out'})
    },

// Login
    login: async (req, res) => {
        const { email, password } = req.body
        const db = req.app.get('db');
        const user = await db.find_user_by_email(email);
        if(!user[0]){
            return res.status(404).send({message: 'Account not found'})
        }
        const result = bcrypt.compareSync(password, user[0].user_password)
        if(!result){
            return res.status(401).send({message: 'Incorrect password'})
        }
        req.session.userData = {...user[0]}
        delete req.session.userData.user_password
        res.status(200).send({
            message: 'Log in successful',
            loggedIn: true,
            userData: req.session.userData
        })
    },

// Update User Info
    updateUser: async (req, res) => {
        const { user_firstName, user_lastName, user_userName, user_email, password, user_zip, user_img } = req.body
        const db = req.app.get('db');
        const user = await db.find_user_by_email(user_email);
        if(!user[0]){
            return res.status(404).send({message: 'Please enter email to update information'})
        }
        const result = bcrypt.compareSync(password, user[0].user_password)
        if(!result){
            return res.status(401).send({message: 'Incorrect password'})
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync( password, salt);
        let updatedUser = await db.update_user([user_firstName, user_lastName, user_userName, user_email, hash, user_zip, user_img])
        req.session.userData = {...updatedUser[0]}
        res.status(200).send({
            message: 'User update successful',
            loggedIn: true,
            userData: req.session.userData
        })
    },



// Endpoints for testing

    // allUsers: async (req, res) => {
    //     const db = req.app.get('db');
    //     const users = await db.getAllUsers();
    //     res.status(200).send(users)
        
    // },
}