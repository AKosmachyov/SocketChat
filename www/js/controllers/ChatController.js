app.controller('ChatController', function($scope, $sanitize, socket, authorization) {
    const self = this;
	self.messages = [];

    socket.on('new message', function (data) {
        if (data.message && data.username) {
	   		self.messages.push(data);
        }
    });
    socket.on('user joined', function (data) {
        if(data.username && data.numUsers) {
        }
    });
    socket.on('user left', function (data) {
        if(data.username && data.numUsers) {
        }
    });
    
    self.addMessage = () => {
        let username = authorization.get();
        let text = $sanitize($scope.text);
        if (!text || !username)
            return;
        let message = {
            message: text,
            username: username
        };
        socket.emit('new message', text);     
        self.messages.push(message);
    };
});