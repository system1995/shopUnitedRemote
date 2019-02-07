/**
 * ShopController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  nearbyShops: function (req, res) {
    Shop.find(function(err, shops) {
      if (err) {return res.serverError(err);}
      var  arrayDiff = require('simple-array-diff');
      var shops = arrayDiff(shops, req.user.likedShops, 'id' ).removed;
      var arraySort = require('array-sort');
      arraySort(shops, 'distance');
      return res.json(shops);
    });
  },

  preferredShops: function (req, res) {
    return res.json(req.user.likedShops);
  },

  likeShop: async function (req, res) {
    console.log(req.user.id);
     await User.addToCollection(req.user.id, 'likedShops', req.body.likeShop).exec(function(err, user) {
        if (err) {return res.serverError(err);};
        res.ok();
     });
  },

};

