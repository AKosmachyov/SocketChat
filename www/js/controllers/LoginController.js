app.controller('LoginController', function($state, $sanitize, socket) {
    this.join = () => {
        let userName = $sanitize(this.userName);
        if(!userName)
            return;
        socket.emit('add user', userName);
        $state.go('chat');
    }
});