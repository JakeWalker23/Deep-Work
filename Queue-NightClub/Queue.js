// Implement a javascript Queue for our nightclub entrants

// Queue constructor

function Queue() {
    
    this.data = [];

    Queue.prototype.add = function(queuee) {
        this.data.unshift(queuee);
    }

    Queue.prototype.remove = function(queuee) {
        this.data.pop(queuee);
    }

    Queue.prototype.first = function() {
        return this.data[0];
    }

    Queue.prototype.last = function() {
        return this.data[this.data.length - 1];
    }

    Queue.prototype.size = function() {
        return this.data.length;
    }

    Queue.prototype.show = function() {
        return this.data
    }
}