import express from 'express'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oidc'
import User from '../models/userModel.js'
import { login, register, getUserProfile, updateUserProfile, getHoReKaUsers, getNGOUsers } from '../controllers/authController.js'
import { protect, isHoReKa, isNGO } from '../middleware/authMiddleware.js'

const router = express.Router()

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/oauth2/redirect/google',
//     scope: [ 'profile' ]
//     }, async (issuer, profile, cb) => {
//         const user = await User.findOne({ email: profile.email }, (err, user) => {
//             if (err) {
//                 return cb(err)
//             }
//             if (!user) {
//                 const newUser = new User({
//                     name: profile.displayName,
//                     email: profile.email,
//                     phone: profile.phone
//                 })
//                 newUser.save()
//                 return cb(null, newUser)
//             }
//             return cb(null, user)
//         })
//     }
// ))

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/oauth2/redirect/google',
//     scope: [ 'profile' ]
//   }, function verify(issuer, profile, cb) {
//     db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
//       issuer,
//       profile.id
//     ], function(err, row) {
//       if (err) { return cb(err); }
//       if (!row) {
//         db.run('INSERT INTO users (name) VALUES (?)', [
//           profile.displayName
//         ], function(err) {
//           if (err) { return cb(err); }

//           var id = this.lastID;
//           db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
//             id,
//             issuer,
//             profile.id
//           ], function(err) {
//             if (err) { return cb(err); }
//             var user = {
//               id: id,
//               name: profile.displayName
//             };
//             return cb(null, user);
//           });
//         });
//       } else {
//         db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
//           if (err) { return cb(err); }
//           if (!row) { return cb(null, false); }
//           return cb(null, row);
//         });
//       }
//     });
//   }));

// router.get('/login', login)
// router.get('/login/federated/google', passport.authenticate('google'))
router.post('/login', login)
      .post('/register', register)
      .get('/profile', protect, getUserProfile)
      .put('/profile', protect, updateUserProfile)

export default router