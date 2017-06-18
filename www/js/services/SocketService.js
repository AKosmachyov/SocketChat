app.factory('socket', function ($rootScope) {
  const socket = io.connect('https://socketio-chat.now.sh/');
  console.log(socket);
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        let args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
          let args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          })
      })
    }
  };
});