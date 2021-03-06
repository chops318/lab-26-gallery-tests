'use strict';

module.exports = (app) => {
  app.controller('AuthController', ['$http', '$location', '$window', 'auth', function($http, $location, $window, auth){
    if (auth.getToken({noRedirect: true})) $location.path('/');
    this.signup = function(user) {
      $http.post(this.baseUrl + '/api/signup', user)
        .then((res) => {
          auth.setToken(res.data.token);
        }, (err) => {
          console.log(err);
        });
    };

    this.signin = function(user) {
      $http.get(this.baseUrl + '/api/signin', {
        headers: {
          'Authorization': 'Basic ' + $window.btoa(user.email + ':' + user.password)
        }
      })
        .then((res) => {
          auth.setToken(res.data.token);
          $location.path('/');
        }, (err) => {
          console.log(err);
        });
    };

    this.getUser = auth.getUser.bind(auth);
    this.logOut = auth.logOut.bind(auth);
    this.currentUser = auth.currentUser;
  }]);
};
