import {Router} from "express";

import AuthController from "../controller/AuthController.js";

const router = new Router();

router.post('/api/users/auth', AuthController.getAccessToken);

export default router;
