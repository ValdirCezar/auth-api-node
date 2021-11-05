import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as httpStatus from "../../../config/constants/httpStatus.js"
import * as secret from "../../../config/constants/constants.js"
import UserException from "../../user/exception/UserException.js";
import UserRepository from "../../user/repository/UserRepository.js";
import UserService from "../../user/service/UserService.js";

class AuthService {

    async getAccessToken(req) {
        try {
            const {email, password} = req.body;
            this.validateAccessTokenData(email, password);
            const user = await UserRepository.findByEmail(email);
            UserService.validateIfUserExixts(user);
            await this.validatePassord(password, user.password)
            const authUser = {id: user.id, email: user.email, password: user.password}
            return jwt.sign(authUser, secret.API_SECRET, {expiresIn: "1d"});
        } catch (e) {
            return {
                status: e.status ? e.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: e.message
            }
        }
    }

    validateAccessTokenData(email, password) {
        if (!email || !password) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Email and password must be informed")
        }
    }

    async validatePassord(password, hashPassword) {
        if (!await bcrypt.compare(password, hashPassword)) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Email or password doesn't match");
        }
    }

}

export default new AuthService();