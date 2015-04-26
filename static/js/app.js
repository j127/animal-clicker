// MVC experiments

var model = {
    getAllAnimals: function () {
        var data = {};
        data.animals = [
            { 'name': 'Harry', 'counter': 0, 'picture': '/static/images/1.jpg' },
            { 'name': 'Bob', 'counter': 0, 'picture': '/static/images/2.jpg' },
            { 'name': 'Bambi', 'counter': 0, 'picture': '/static/images/3.jpg' },
            { 'name': 'Clawz', 'counter': 0, 'picture': '/static/images/4.jpg' },
            { 'name': 'Curly', 'counter': 0, 'picture': '/static/images/5.jpg' }
        ];
        return data;
    }
};

var controller = {
    init: function () {
        console.log('init');
    },
    getAnimals: function () {
        return model.getAllAnimals();
    }
};

var animalListView = {
    init: function () {
        this.animalList = $('#animalList');
        animalListView.render();
    },
    render: function () {
        var outputHtml = '';
        controller.getAnimals().forEach(function (animal) {
            outputHtml += '<li class="list-group-item"><span class="badge">' +
                        animal.counter + '</span>' +
                        '<a href="#" class="animalListLink">' +
                        animal.name + '</a>' + '</li>';
        });
        this.animalList.html(outputHtml);
    }
};


var animalDetailView = {};

// Start the app
controller.init();
