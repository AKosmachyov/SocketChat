app.controller('LoginController', function($state, $sanitize, socket, authorization) {
    this.join = () => {
        let userName = $sanitize(this.userName);
        if(!userName)
            return;
        authorization.set(userName);
        socket.emit('add user', userName);
        $state.go('chat');
    }
});