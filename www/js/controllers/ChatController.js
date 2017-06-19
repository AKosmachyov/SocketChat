app.controller('ChatController', function($scope, $sanitize, socket, authorization) {
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
        let message = self.createInfoMessage(data, false);
        if (message)
            self.addMessage(message);
    });
    
    self.sendMessage = () => {
        let username = authorization.get();
        let text = $sanitize($scope.text);
        if (!text || !username)
            return;
        let message = self.createUserMessage({
            message: text,
            username: username
        });
        socket.emit('new message', text);     
        self.messages.push(message);
        $scope.text = '';
    };

    self.addMessage = (message) => {
        if(!message)
            return null;
        self.messages.push(message);
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
    self.createInfoMessage = (data, isNew) => {
        if(!(data.username && data.numUsers))
            return null;
        let message = isNew ? `${data.username} joined`: `${data.username} left`;
        return {
            isInfo: true,
            message: message,
            numUsers: data.numUsers
        }
    }
});