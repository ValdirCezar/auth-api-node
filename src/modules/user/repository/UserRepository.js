import User from "../model/User.js";

class UserRepository {

    async findById(id) {
        try {
            return await User.findById(id);
        } catch (e) {
            console.error(e.message);
            return null;
        }
    }

    async findByEmail(email) {
        try {
            return await User.findOne(email)
        } catch (e) {
            console.error(e.message);
            return null;
        }
    }
}

export default new UserRepository();