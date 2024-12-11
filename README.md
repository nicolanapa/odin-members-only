You can view this Project on this [link](https://odin-members-only-ig5z.onrender.com/)

This is a site with different permissions (membership_status and admin in messages) and Messages (messages table).
</br>
An User can create Messages and modify them (if they're the owner or admin) and delete them (only admin).
</br>
It uses express-session and connect-pg-simple for sessions and manages authentication through passport.js and LocalStrategy.
</br>
In the username table, the email column is the "username" the password column is encrypted with argon2id for security
