// let arr = ["sanjeev" , "shanu" , "tamana" , "MUKUL"]
// let result = arr.filter((arr)=> arr.length >5)
// console.log(result)

// const { constants } = require("buffer");
// const { name } = require("ejs");

// const { kMaxLength, isUtf8 } = require("buffer");
// const { dir } = require("console");

// let http = require("http")
// http.createServer((req,res)=>{
//         res.write("sanjeev bhawra")
//         res.end();
// }).listen(4500)

// let colour = require("colors")
// console.log("Sanjeev".blue)

// let http = require("http")
// let data = require('./data')
// http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-Type': 'aplication/json'})
//     res.write(JSON.Stringsify(data))
//  res.end()
// }).listen(9000);


// const fs = require("fs")
// const path = require("path")
// const dirpath = path.join(__dirname, 'sanjeev')
// const filepath = `${dirpath}/shanu.txt`
// fs.rename(filepath,`${dirpath}/mukul`,(err,item)=>{
//     if (!err) {
//         console.log('updated')
//     }
// })


// const express = require('express');
// const app = express();
// const reqFiter= require('./middelware')
// const rout = express.Router()
// rout.use(reqFiter)

// app.get('', (req, res) => {
//     res.send('this is home page')
// });
// app.set('view engine', 'ejs');
// app.get('/about', (_, res) => {
//     res.send('this is about page')
// })
// rout.get('/profile', (_, res) => {
//     const user = {
//         name: 'sanjeev bhawra',
//         age: 19,
//         email: 'sanjeev@gmail.com',
//         city: 'pathankot'
//     }
//     res.render('profile', { user })
// })\
// app.get('/help', (_, res) => {
//     res.send('this is help page')
// });
// app.listen(6800);
// app.use('/',rout);

// const {MongoClient} = require('mongodb');
// const url = 'mongodb://localhost:27017'
// const client = new MongoClient(url)

// async function getdata(){
// let result = await client.connect();
// let db = result.db('e-bhawra_store');
// let collection = db.collection('mobiles')
// let responce = await collection.find({}).toArray({})
// console.log(responce)
// }
// getdata()






// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/e-bhawra_store');
// const productshc = new mongoose.Schema({
//     brand: String,
//     model: String,
//     camera:String,
//     processer: String,
//     IP:Number,
//     Owener:String
// })

// const mama = async()=>{
//     const Product = mongoose.model('mobiles',productshc)
//     let data = new Product({brand: 'oppo', model: 'find f2', camera:'50+50+50 mp', processer:'8 gen 3', IP: 68, Owener: 'sanjeev bhawra'})
//     const result = await data.save();
//     console.log(result)
// }a
// const updatedb = async()=>{
//     const Product = mongoose.model('mobiles',productshc)
//     let data2 = await Product.updateOne(
//         {brand:'oppo'}, {$set:{model:'find f3'}}
//     )
//     console.log(data2)
// }

// const deletedata= async()=>{
//     const Product = mongoose.model('mobiles',productshc)
//     let data3 = await Product.deleteOne({brand:'oone plus 12'})
// console.log(data3)
// }
// const findData= async()=>{
//     const Product = mongoose.model('mobiles',productshc)
//     let data3 = await Product.find({brand:'MI'})
// console.log(data3)
// }
// findData()





// const express = require('express');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const User = require('./user'); 
// const sendMail = require('./sendMail'); 

// const app = express();
// const secretKey = 'secretkey';

// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/login', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.error('Error connecting to MongoDB', err);
// });

// app.get('/home', (req, res) => {
//     res.json("Welcome To Home");
// });

// app.post('/sign-up', async (req, res) => {
//     const { username, password,mobile , email } = req.body;
    
//     try {
//         const userExists = await User.findOne({ username });
//         if (userExists) {
//             return res.json({ error: 'Username already exists' });
//         }

//         const newUser = new User({ username, password,mobile,email });
//         await newUser.save();

//         res.json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error during sign up:', error);
//         res.json({ error: 'Internal server error' });
//     }
// });

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
    
//     try {
//         const user = await User.findOne({ username });
//         if (!user || user.password !== password) {
//             return res.json({ error: 'Invalid username or password' });
//         }
        
//         jwt.sign({ user: { id: user._id, username: user.username } }, secretKey, { expiresIn: '72000s' }, (err, token) => {
//             if (err) {
//                 console.error('Error generating token:', err);
//                 return res.json({ error: 'Error generating token' });
//             } else {
//                 res.json({ token });
//             }
//         });
//     } catch (error) {
//         console.error('Internal server error:', error);
//         res.json({ error: 'Internal server error' });
//     }
// });

// app.listen(9000, () => {
//     console.log('Server is running on port 9000');
// });




const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./user');
const sendMail = require('./sendMail');
const crypto = require('crypto');
const otpStore = {};
const app = express();
const secretKey = 'secretkey';
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'nodeJS project for mongoDB',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:9001/'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./node.js']
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect('mongodb://localhost:27017/login', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token:", token);

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }

        req.userId = decoded.user.id;
        req.userRole = decoded.user.role;
        next();
    });
};

const verifyAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

/**
 * @swagger
 * /home:
 *  get:
 *      summary: welcome to sanjeev API Project
 *      description: This API checks if the server is running properly
 *      responses:
 *          200:
 *              description: welcome to sanjeev API Project
 */
app.get('/home', (req, res) => {
    res.json(" Hello Welcome To Home");
});

/**
 * @swagger
 * /sign-up:
 *  post:
 *      summary: Add A New User
 *      description: This API registers a new user and sends an OTP for email verification
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                          mobile:
 *                              type: string
 *                          email:
 *                              type: string
 *                          role:
 *                              type: string
 *      responses:
 *          200:
 *              description: User registered successfully
 *          400:
 *              description: Bad request
 */
app.post('/sign-up', async (req, res) => {
    const { username, password, mobile, email, role } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.json({ error: 'Username already exists' });
        }

        const newUser = new User({ username, password, mobile, email, role });
        await newUser.save();

        const otp = crypto.randomInt(100000, 999999).toString();
        otpStore[email] = otp;

        await sendMail(email, 'Your OTP Code', `Your OTP is: ${otp}`);

        res.json({ message: 'User registered successfully. OTP sent to email for verification.' });
    } catch (error) {
        console.error('Error during sign up:', error);
        res.json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Login a user
 *      description: This API logs in a user and returns a JWT token
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Login successful
 *          400:
 *              description: Invalid username or password
 */
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.json({ error: 'Invalid username or password' });
        }

        jwt.sign({ user: { id: user._id, username: user.username, role: user.role } }, secretKey, { expiresIn: '72000s' }, (err, token) => {
            if (err) {
                console.error('Error generating token:', err);
                return res.json({ error: 'Error generating token' });
            } else {
                res.json({ token });
            }
        });
    } catch (error) {
        console.error('Internal server error:', error);
        res.json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /otp-verification:
 *  post:
 *      summary: Verify OTP
 *      description: This API verifies the OTP sent to the user's email
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          otp:
 *                              type: string
 *      responses:
 *          200:
 *              description: OTP verification successful
 *          400:
 *              description: Invalid OTP or email
 */
app.post('/otp-verification', async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (otpStore[email] && otpStore[email] === otp) {
            const user = await User.findOne({ email });
            if (!user) {
                return res.json({ error: 'Invalid email' });
            }

            jwt.sign({ user: { id: user._id, username: user.username, role: user.role } }, secretKey, { expiresIn: '72000s' }, (err, token) => {
                if (err) {
                    console.error('Error generating token:', err);
                    return res.json({ error: 'Error generating token' });
                } else {
                    delete otpStore[email];
                    res.json({ token });
                }
            });
        } else {
            res.json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /profile:
 *  get:
 *      summary: Get user profile
 *      description: This API retrieves the profile of the logged-in user
 *      responses:
 *          200:
 *              description: User profile retrieved successfully
 *          404:
 *              description: User not found
 */
app.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId, { password: 0 });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error retrieving profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /admin/add-user:
 *  post:
 *      summary: Add a new user by admin
 *      description: This API allows admin to add a new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                          mobile:
 *                              type: string
 *                          email:
 *                              type: string
 *                          role:
 *                              type: string
 *      responses:
 *          200:
 *              description: User added successfully by admin
 *          400:
 *              description: Username already exists
 */
app.post('/admin/add-user', verifyToken, verifyAdmin, async (req, res) => {
    const { username, password, mobile, email, role } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.json({ error: 'Username already exists' });
        }

        const newUser = new User({ username, password, mobile, email, role });
        await newUser.save();

        res.json({ message: 'User added successfully by admin.' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.json({ error: 'Internal server error' });
    }
});


/**
 * @swagger
 * /delete-user/{id}:
 *  delete:
 *      summary: Delete a user by admin
 *      description: This API allows admin to delete a user by ID
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: The user ID
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: User deleted successfully
 *          404:
 *              description: User not found
 */
app.delete('/delete-user/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(9001, () => {
    console.log('Server is running on port 9001');
});