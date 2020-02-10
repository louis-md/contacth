const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User'
    // },
    // sharedWith: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User'
    // },
    firstName:String,
    lastName:String,
    secondaryEmails: [String],
    phoneNumbers: [Number],
    ethAddresses: [String],
    postalAddresses: [{
      streetName: String,
      streetNumber: Number,
      special: String,
      postCode: Number,
     
      city: String,
      country: String,
      principalResidency: Boolean
      }],
    socialAccounts: {
      googleId: String,
      twitterId: String,
      facebookId: String,
      githubId: String
      },
    avatar: {
      type: String,
      default: "https://cdn.onlinewebfonts.com/svg/img_258083.png"
    },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;