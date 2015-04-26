// MVC experiments

var model = {
    init: function () {
        // TODO: create models and put them in localStorage
        console.log('Initialize models');
    },
    getAllAnimals: function () {
        var data = {};
        data.animals = [
            { 'id': 1, 'name': 'Harry', 'counter': 0, 'picture': '/static/images/1.jpg' },
            { 'id': 2, 'name': 'Bob', 'counter': 0, 'picture': '/static/images/2.jpg' },
            { 'id': 3, 'name': 'Bambi', 'counter': 0, 'picture': '/static/images/3.jpg' },
            { 'id': 4, 'name': 'Clawz', 'counter': 0, 'picture': '/static/images/4.jpg' },
            { 'id': 5, 'name': 'Curly', 'counter': 0, 'picture': '/static/images/5.jpg' }
        ];
        return data;
    }
};

var controller = {
    init: function () {
        model.init();
        animalListView.init();
    },
    getAnimals: function () {
        return model.getAllAnimals();
    }
};

// TODO: use a view Class
var animalListView = {
    init: function () {
        this.animalList = $('#animalList');
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
        this.animalList.html(outputHtml);
        animalLinks = document.querySelectorAll('.animalListLink');
        for (i = 0, iLen = animalLinks.length - 1; i <= iLen; i ++) {
            animalLinks[i].addEventListener('click', this.clickHandler, false);
        }
    },
    clickHandler: function (e) {
        e.preventDefault();
        var animalId = this.dataset.animalId;
        console.log(animalId);
    }
};


var animalDetailView = {};

// Start the app
controller.init();
