// MVC experiments without jQuery or external libraries

var model = {
    getAllAnimals: function () {
        var data = {};
        data.animals = [
            { 'id': 1, 'name': 'Harry', 'counter': 0, 'pictureUrl': '/static/images/1.jpg' },
            { 'id': 2, 'name': 'Bob', 'counter': 0, 'pictureUrl': '/static/images/2.jpg' },
            { 'id': 3, 'name': 'Bambi', 'counter': 0, 'pictureUrl': '/static/images/3.jpg' },
            { 'id': 4, 'name': 'Clawz', 'counter': 0, 'pictureUrl': '/static/images/4.jpg' },
            { 'id': 5, 'name': 'Curly', 'counter': 0, 'pictureUrl': '/static/images/5.jpg' }
        ];
        return data;
    },
    getAnimalById: function (animalId) {
        console.log('got animalId', animalId);
        var result;
        var query = this.getAllAnimals();
        query.animals.filter(function (obj) {
            if (obj.id === parseInt(animalId)) {
                result = obj
            }
        });
        return result;
    }
};

var controller = {
    init: function () {
        animalListView.init();
        animalDetailView.init();
    },
    getAnimals: function () {
        return model.getAllAnimals();
    },
    getAnimal: function (animalId) {
        var animal = model.getAnimalById(animalId);
        return animal;
    },
    incrementCounter: function (animalId) {
        model.getAnimalById(animalId).id += 1;
    }
};

// TODO: use a View class and create two instances
var animalListView = {
    init: function () {
        this.animalList = document.querySelector('#animalList');
        animalListView.render();
    },
    render: function () {
        var outputHtml = '',
            animals,
            animalLinks,
            i, iLen;

        animals = controller.getAnimals().animals;
        animals.forEach(function (animal) {
            outputHtml += '<li class="list-group-item"><span class="badge">' +
                        animal.counter + '</span>' +
                        '<a href="#" class="animalListLink" data-animal-id="' +
                        animal.id + '">' +
                        animal.name + '</a>' + '</li>';
        });
        this.animalList.innerHTML = outputHtml;
        
        // Add event handlers
        animalLinks = document.querySelectorAll('.animalListLink');
        for (i = 0, iLen = animalLinks.length - 1; i <= iLen; i ++) {
            animalLinks[i].addEventListener('click', this.clickHandler, false);
        }
    },
    clickHandler: function (e) {
        e.preventDefault();
        var animalId = this.dataset.animalId;
        animalDetailView.render(animalId);
    }
};

var animalDetailView = {
    init: function () {
        this.animalDetail = document.querySelector('#animalDetail');
        console.log('animalDetail', animalDetail);
        //animalDetailView.render();
    },
    render: function (animalId) {
        var outputHtml = '',
            animal,
            animalPic,
            i, iLen;

        animal = controller.getAnimal(animalId);
        outputHtml += '<img id="animalPic" src="' +
                    animal.pictureUrl +
                    '" alt="' + animal.name + '">';
        console.log(outputHtml);
        this.animalDetail.innerHTML = outputHtml;

        // Add event handler
        animalPic = document.querySelector('#animalPic');
        animalPic.addEventListener('click', this.clickHandler, false);
    },
    clickHandler: function (e) {
        e.preventDefault();
        var animalId = this.dataset.animalId;
        var x = model.incrementCounter(animalId);
        console.log(animalId, x);
    }
};

// Start the app
controller.init();
