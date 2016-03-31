(function() {
    // websocket code based on https://github.com/mesopotamia/ws-element
    Polymer({
        is: "stall-indicator",
        socket: null,
        properties: {
            stallId: {
                type: String,
                value: "0"
            },
            isOpen: {
                type: Boolean,
                value: false
            },
        },
        observers: [
            "_statusChange(isOpen)"
        ],
        listeners: { // REMOVE AFTER TESTING
            "tap": "_tap",
        },
        ready: function () {
            var host = window.document.location.host.replace(/:.*/, '');
            this.socket = new WebSocket('ws://' + host + ':8080');///' + this.stallId);

            this.socket.onerror   = this._onError;
            this.socket.onopen    = this._onOpen;
            this.socket.onmessage = this._onMessage.bind(this);
        },
        detached: function () {
            this.socket.close();
        },
        _onError: function (error) {
            console.log('ws error ' + error);
        },
        _onOpen: function (event) {
            console.log('connected');
        },
        _onMessage: function (event) {
            if (event.data == 0 && !this.isOpen) { //TODO
                this.isOpen = true;
            }

            else if (event.data == 1 && this.isOpen) { //TODO
                this.isOpen = false;
            }
        },
        _statusChange: function (isOpen) {
            if (isOpen) {
                this.$.indicator.textContent = "Vacant";
                this.$.indicator.style.backgroundColor = "green";
            } else {
                this.$.indicator.textContent = "Occupied";
                this.$.indicator.style.backgroundColor = "red";
            }
        },
        _tap: function (e) {
            this.isOpen = this.isOpen ? false : true;
        }
    });
})();
