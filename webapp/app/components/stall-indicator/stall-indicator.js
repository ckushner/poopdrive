(function() {
    Polymer({
        is: "stall-indicator",
        properties: {
            stallId: {
                type: String,
                value: "empty-stall"
            },
            isOpen: {
                type: Boolean,
                value: false
            }
        },
        observers: [
            "_statusChange(isOpen)"
        ],
        listeners: {
            "tap": "_tap"
        },
        ready: function () {
            console.log("tracking " + this.stallId);
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
