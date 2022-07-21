// =====Фротн-энд часть=====
// 1. создать кнопку для входа через Гугл
// 2. написать функцию по обработк токена от Гугл
// 3. добавить ПОСТ запрос с фронт-энда на бэкенд отправляющий токен
//
// =====Бэкенд часть==========
// 1. если user нет в БД, создать нового юзера, в поле google ставим true
// 2. если есть такой юзер, проверить поле google:
// 2.1 google=true - значит пользователь зарегистрирован через google и
//      ему нужен логин
// 2.2 google=false - пользователь зарегистрирован через почту и пароль,
//      выдать ошибку


const { User } = require("../../models/user");
const { OAuth2Client } = require('google-auth-library');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { createError } = require("../../helpers");

const { REACT_APP_GOOGLE_CLIENT_ID,  SECRET_KEY} = process.env;

const client = new OAuth2Client(REACT_APP_GOOGLE_CLIENT_ID);

const googleAuth = async (res, req) => {
    const { token : googleToken } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.CLIENT_ID,
    });
    const { name, email } = ticket.getPayload();

    const user = await User.findOne({ email });
    
    if (!user) {
        const result = await User.create({
            name,
            email,
            google: true,
        });
        const payload = {
        id: result._id,
        };
        const token = jwt.sign(payload, SECRET_KEY);
        await User.findByIdAndUpdate(result._id, { token });
        res.status(201).json({
            token,
            user: {
            email: result.email,
            name: result.name,
            },
        });
    }
    
    if (!user.google) {
        throw createError(409, "Email in use");
    }
    const payload = {
    id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        user: {
        email: user.email,
        name: user.name,
        },
    });
};

module.exports = googleAuth;