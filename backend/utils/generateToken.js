import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30m' //'30d' // a lot sooner
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 60 * 1000 // 30minuts   || //30 * 24 * 60 * 60 * 1000 // 30d
    })
}

export default generateToken;