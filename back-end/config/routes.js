/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'post /user/signup': 'UserController.signUp',
  'post /user/login': 'UserController.login',
  'get /user/token': 'UserController.token',
  
  'get /shop': 'ShopController.nearbyShops',
  'get /shop/preferredshops': 'ShopController.preferredShops',
  'post /shop/like': 'ShopController.likeShop',
  'post /shop/preferredshops/remove': 'ShopController.removePreferredShop',

};
