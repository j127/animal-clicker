// Knockout.js version

var ko = require('knockout');

var initialAnimals = [
    { 'clickCount': 0, 'name': 'Harry', 'nicknames': ['Fufu', 'Fluffy', 'Furball', 'Fireball'], 'imgSrc': 'static/images/1.jpg' },
    { 'clickCount': 0, 'name': 'Bob', 'nicknames': ['Panther', 'Tiger'], 'imgSrc': 'static/images/2.jpg' },
    { 'clickCount': 0, 'name': 'Bambi', 'nicknames': ['Cutie'], 'imgSrc': 'static/images/3.jpg' },
    { 'clickCount': 0, 'name': 'Clawz', 'nicknames': ['Happy', 'Scratchy'], 'imgSrc': 'static/images/4.jpg' },
    { 'clickCount': 0, 'name': 'Curly', 'nicknames': ['Baa', 'Jumper'], 'imgSrc': 'static/images/5.jpg' }
];

var Animal = function (data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.nicknames = ko.observableArray(data.nicknames);
    this.imgSrc = ko.observable(data.imgSrc);

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
    var self = this;

    this.animalList = ko.observableArray([]);
    initialAnimals.forEach(function (animal) {
        self.animalList.push(new Animal(animal));
    });

    this.currentAnimal = ko.observable(this.animalList()[0]);

    this.incrementCounter = function () {
        this.clickCount(this.clickCount() + 1);
    };
    this.changeCurrentAnimal = function (animal) {
        self.currentAnimal(animal);
    };
};

ko.applyBindings(new ViewModel());
