const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  jobTitle: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String, // URL to profile picture
    default: null
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'light'
  },
  notifications: {
    type: Boolean,
    default: true
  },
  emailUpdates: {
    type: Boolean,
    default: true
  },
  language: {
    type: String,
    default: 'en'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Hash password before saving
// userSchema.pre('save', function(next) {
//   // Only hash password if it's new or has been modified
//   if (!this.isModified('password')) {
//     next();
//     return;
//   }

//   try {
//     // Use sync methods for simplicity
//     const salt = bcrypt.genSaltSync(12);
//     this.password = bcrypt.hashSync(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Compare password method
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);