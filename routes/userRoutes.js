import express from 'express'
import * as userController from '../Controller/userController.js'


const router  = express.Router();

router.get('/', userController.getAllUsers);

router.get('/getUserByID', userController.getUserByID);

router.post('/', userController.createUser)

router.post('/login', userController.login)

export default router;

