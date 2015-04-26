// MVC experiments without jQuery or external libraries

var model = {
    animals: [
        { 'id': 1, 'name': 'Harry', 'counter': 0, 'pictureUrl': '/animal-clicker/static/images/1.jpg' },
        { 'id': 2, 'name': 'Bob', 'counter': 0, 'pictureUrl': '/animal-clicker/static/images/2.jpg' },
        { 'id': 3, 'name': 'Bambi', 'counter': 0, 'pictureUrl': '/animal-clicker/static/images/3.jpg' },
        { 'id': 4, 'name': 'Clawz', 'counter': 0, 'pictureUrl': '/animal-clicker/static/images/4.jpg' },
        { 'id': 5, 'name': 'Curly', 'counter': 0, 'pictureUrl': '/animal-clicker/static/images/5.jpg' }
    ],
    currentAnimal: null
};

var controller = {
    init: function () {
        // Initializes the application
        model.currentAnimal = model.animals[0];
        animalListView.init();
        animalDetailView.init();
    },
    getAnimals: function () {
        return model.animals;
    },
    getCurrentAnimal: function () {
        return model.currentAnimal;
    },
    setCurrentAnimal: function (animal) {
        model.currentAnimal = animal;
    },
    incrementHandler: function () {
        // Increases a given animal's click counter
        model.currentAnimal.counter++;
        animalListView.render();
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
            elem,
            badge,
            animal,
            animals,
            animalLinks,
            i, iLen;

        this.animalList.innerHTML = outputHtml;
        
        animals = controller.getAnimals();
        // Add event handlers
        animalLinks = document.querySelectorAll('.animalListLink');
        for (i = 0, iLen = animals.length - 1; i <= iLen; i ++) {
            animal = animals[i];
            elem = document.createElement('li');
            elem.className = 'list-group-item';
            elem.textContent = animal.name;
            badge = document.createElement('span');
            badge.textContent = animal.counter;
            badge.className = 'badge';
            elem.appendChild(badge);
            elem.addEventListener('click', (function (animalCopy) {
                return function() {
                    controller.setCurrentAnimal(animalCopy);
                    animalDetailView.render();
                };
            })(animal));
            this.animalList.appendChild(elem);
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
        this.render();
    },
    render: function (animalId) {
        var outputHtml = '',
            animal,
            animalPic,
            i, iLen;

        animal = controller.getCurrentAnimal();
        outputHtml += '<img id="animalPic"' + ' data-animal-id="' +
                    animal.id + '" src="' +
                    animal.pictureUrl +
                    '" alt="' + animal.name + '">';
        this.animalDetail.innerHTML = outputHtml;

        // Add event handler
        animalPic = document.querySelector('#animalPic');
        animalPic.addEventListener('click', this.clickHandler, false);
    },
    clickHandler: function (e) {
        e.preventDefault();
        controller.incrementHandler();
    }
};

// Start the app
controller.init();
