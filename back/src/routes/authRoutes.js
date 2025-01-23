const AuthMapper = require("@mapper/AuthMapper");
const AuthController = require("@controllers/AuthController")
const express = require("express");
const router = express.Router();

class authRessources {
    static authMapper = new AuthMapper();

    static async loginWithJwt(req, res) {
        try {
            const loginRequestDto = authRessources.authMapper.toLoginRequestDto(req.body);
            const token = await AuthController.login(loginRequestDto);

            return res.status(200).json({ token });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

router.post('/login', authRessources.loginWithJwt);

module.exports = router;