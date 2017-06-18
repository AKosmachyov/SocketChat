app.factory('authorization', function ($rootScope) {
  var self = this;
  var username;
  return {
    get: function () {
        return self.username;
    },
    set: function(username) {
        if(username)
            self.username = username;
    }
  };
});