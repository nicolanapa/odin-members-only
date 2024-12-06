import passport from "passport";
import LocalStrategy from "passport-local";
import * as argon2 from "argon2";
import pool from "./pool";

passport.use(
    new LocalStrategy(async (id, password, done) => {
        const { rows } = await pool.query("SELECT * FROM username WHERE id = $1", [id]);
        const user = rows[0];

        if (!user) {
            return done(null, false);
        }

        const hashedPassword = await argon2.hash(password);

        if (hashedPassword !== user.password) {
            return done(null, false);
        }

        return done(null, user);
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const { rows } = await pool.query("SELECT * FROM username WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
});
