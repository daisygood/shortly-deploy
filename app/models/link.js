var mongoose = require('mongoose');
var db = require('../config');
var crypto = require('crypto');

var UrlsSchema = mongoose.Schema({
  // id: Number,
  url: String,
  baseUrl: String,
  // code: String,
  code: { type: String /*, index: { unique: true }*/},
  title: String,
  visits: {type: Number, default: 0},
  timeStamp: Date
});


UrlsSchema.pre('save', function (next) {
  var urls = this;
  var shasum = crypto.createHash('sha1');
  shasum.update(urls.url);
  urls.code = shasum.digest('hex').slice(0, 5);
  next();
});





var Link = mongoose.model('Link', UrlsSchema);

module.exports = Link;






// var db = require('../config');
// var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

// module.exports = Link;
