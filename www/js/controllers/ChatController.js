app.controller('ChatController', function($scope, $ionicScrollDelegate , socket, authorization) {
    const self = this;
	self.messages = [];

    socket.on('new message', function (data) {
        let message = self.createUserMessage(data);
        if (message)
            self.addMessage(message);
    });
    socket.on('user joined', function (data) {
        let message = self.createInfoMessage(data, true);
        if (message)
            self.addMessage(message);
    });
    socket.on('user left', function (data) {
        let message = self.createInfoMessage(data);
        if (message)
            self.addMessage(message);
    });
    socket.on('login', function (data) {
        let message = self.createInfoMessage(data);
        if (message)
            self.addMessage(message);
    });
    
    self.sendMessage = () => {
        let username = authorization.get();
        let text = $scope.text;
        if (!text || !username)
            return;
        let message = self.createUserMessage({
            message: text,
            username: username
        });
        socket.emit('new message', text);     
        self.addMessage(message);
        $scope.text = '';
    };

    self.addMessage = (message) => {
        if(!message)
            return null;
        self.messages.push(message);
        self.scrollBottom();
    }
    self.createUserMessage = (data, isInfo) => {
        if (!(data.username && data.message))
            return null;
        return {
            isInfo: false,
            message: data.message,
            username: data.username
        }
    }
    self.createInfoMessage = (data, isJoined) => {
        if (!data.numUsers)
            return null;
        if (data.username) {
            var message = isJoined ? `${data.username} joined`: `${data.username} left`;
        } else {
            var message = "Welcome to the Socket-Chat";    
        }
        return {
            isInfo: true,
            message: message,
            numUsers: data.numUsers
        }
    }
    self.scrollBottom = function() {
        $ionicScrollDelegate.scrollBottom(true);
    };
});