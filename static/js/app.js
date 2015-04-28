// Knockout.js version

//animals: [
    //{ 'id': 1, 'name': 'Harry', 'counter': 0, 'pictureUrl': '/static/images/1.jpg' },
    //{ 'id': 2, 'name': 'Bob', 'counter': 0, 'pictureUrl': '/static/images/2.jpg' },
    //{ 'id': 3, 'name': 'Bambi', 'counter': 0, 'pictureUrl': '/static/images/3.jpg' },
    //{ 'id': 4, 'name': 'Clawz', 'counter': 0, 'pictureUrl': '/static/images/4.jpg' },
    //{ 'id': 5, 'name': 'Curly', 'counter': 0, 'pictureUrl': '/static/images/5.jpg' }
//]

var Animal = function () {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Harry');
    this.nicknames = ko.observableArray(['Fufu', 'Fluffy', 'Furball', 'Fireball']);
    this.imgSrc = ko.observable('static/images/1.jpg');

    this.level = ko.computed(function () {
        if (this.clickCount() >= 0 && this.clickCount() < 10) {
            return 'Baby';
        } else if (this.clickCount() >= 10 && this.clickCount() < 15) {
            return 'Neophyte';
        } else if (this.clickCount() >= 15 && this.clickCount() < 25) {
            return 'Adult';
        } else {
            return 'Senior';
        }
    }, this);
};

var ViewModel = function () {
    this.currentAnimal = ko.observable(new Animal());

    this.incrementCounter = function () {
        this.currentAnimal().clickCount(this.currentAnimal().clickCount() + 1);
    };
};

ko.applyBindings(new ViewModel());
