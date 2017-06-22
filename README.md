# Socket Chat

The Socket Chat built using Ionic, AngularJS, Socket io.

## Installation

Make sure you have [Node.js, npm](https://nodejs.org/) installed.

1. Clone or Download the repository

	```
	$ git clone https://github.com/AKosmachyov/SocketChat.git
	$ cd SocketChat
	```
	
2. Install Cordova and Ionic globally

	```
	$ npm install -g cordova
	$ npm install -g ionic
	```


3. Install Dependencies

	```
	$ npm install
	$ bower install
	```

4. Now, we need to tell ionic that we want to enable the iOS and Android platforms. Note: unless you are on MacOS, leave out the iOS platform:

    ```
    $ ionic platform add android
    $ ionic platform add ios
    ```
    
5. Test it out.
    
    ```
    Desktop browser testing:
    $ ionic serve
    ```
    
    ```
    Testing as a native app:
    $ ionic cordova run android
    $ ionic cordova run ios
    ```