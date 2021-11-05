import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js"
import UserException from "../exception/UserException.js"

class UserService {

    async findByEmail(req) {
        try {
            const { email } = req.params;
            this.validateRequestData(email);

            let user = await UserRepository.findByEmail(email);
            this.validateIfUserExixts(user);

            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            }
        } catch (e) {
            return {
                status: e.status ? e.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: e.message
            }
        }
    }

    validateRequestData(email) {
        if(!email) {
            throw new UserException(httpStatus.BAD_REQUEST , 'Email was not informed');
        }
    }

    validateIfUserExixts(user) {
        if(!user) {
            throw new UserException(httpStatus.OBJECT_NOT_FOUND, "Object not found")
        }
    }
}

export default new UserService();