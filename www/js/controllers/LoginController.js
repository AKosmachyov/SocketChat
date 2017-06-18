app.controller('LoginController', function($state,$sanitize) {
    this.join = () => {
        let userName = $sanitize(this.userName);
        if(userName)
            $state.go('chat');
    }
});