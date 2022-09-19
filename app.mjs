import express, { json, urlencoded } from 'express';
import {} from "dotenv/config";
import logger from "morgan";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import cors from "cors";
import { routeUser } from "./src/routes/route.user.mjs";
import {  } from "./middleware/passport.mjs";
import passport from 'passport';
import { routeAuth } from './src/routes/route.auth.mjs';



const app = express();
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/user', passport.authenticate('jwt', { session: false }), routeUser);
app.use('/api/auth',  routeAuth);






app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err; // In development only, comment this out in production
    // Uncomment the following in production
    // res.locals.error = {};
    // render the error page
    res.status(err.status || 500);
    res.send(res.locals);
});





const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});