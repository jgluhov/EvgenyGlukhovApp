(function (global, doc) {
    'use strict';

    function Person(name) {
        if (!(this instanceof Person))
            return new Person(name);

        this.name = name;
    }

    Person.prototype.puts = function (str) {
        console.log(str);
    };

    Person.prototype.getName = function () {
        return this.name;
    };

    Person.prototype.putName = function () {
        this.puts(this.getName());
    };

    Person.prototype.showName = function () {
        var banner;

        banner = doc.createElement('div');
        banner.classList.add('banner');
        banner.appendChild(doc.createTextNode(this.getName()));
        doc.body.appendChild(banner);
    };

    Person.prototype.hideName = function () {
        var banner;

        banner = doc.querySelector('.banner');
        doc.body.removeChild(banner);
    };

    function Employee(name) {
        if (!(this instanceof Employee))
            return new Employee(name);

        Person.call(this, name);
    }

    Employee.prototype = Object.create(Person.prototype);
    Employee.constructor = Employee;

    Employee.prototype.toggleName = function () {
        var banner;

        banner = doc.querySelector('.banner');

        banner.classList.toggle('hidden');
    };

    Employee.prototype.toggleButton = function () {
        var button;

        button = doc.querySelector('.button');

        button.classList.toggle('add');
        button.classList.toggle('delete');

        button.textContent = button.classList.contains('add') ?
            'Show content' : 'Remove content';
    };

    Employee.prototype.getContent = function () {
        var fragment,
            banner,
            button;

        fragment = doc.createDocumentFragment();

        button = doc.createElement('button');
        button.textContent = 'Show content';
        button.addEventListener('click', this.onClickHandler.bind(this));
        button.classList.add('button');
        button.classList.add('add');

        banner = doc.createElement('h1');
        banner.classList.add('banner');
        banner.classList.add('hidden');
        banner.appendChild(doc.createTextNode(this.getName()));

        fragment.appendChild(banner);
        fragment.appendChild(button);

        return fragment;
    };

    Employee.prototype.onClickHandler = function (e) {
        this.toggleButton();
        this.toggleName();
    };

    var john = new Employee("EVGENY GLUKHOV");

    doc.body.appendChild(john.getContent());

})(window, document);
