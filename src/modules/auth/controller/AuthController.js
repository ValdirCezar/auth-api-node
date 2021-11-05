import AuthService from "../service/AuthService.js";

class AuthController {
    async getAccessToken(req, res) {
        let accessToken = await AuthService.getAccessToken(req);
        return res.status(200).json({accessToken})
    }
}

export default new AuthController();