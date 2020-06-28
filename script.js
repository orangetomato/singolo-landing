'use strict';

(function() {
    const linkList = document.querySelectorAll('.navigation-menu__link');
    const sections = document.querySelectorAll('[id]');

    function changeColorByScroll() {
        const currentPositionY = window.scrollY;

        sections.forEach(section => {
            if (section.offsetTop - 96 <= currentPositionY && section.offsetTop + section.offsetHeight - 96 > currentPositionY) {
                linkList.forEach(link => {
                    link.classList.remove('navigation-menu__link--current');
                    if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                        link.classList.add('navigation-menu__link--current');
                    }
                });
            }
        });
    }
    document.addEventListener('scroll', changeColorByScroll);
})();

(function() {
    const slider = document.querySelector('.page-main__slider');
    const items = document.querySelectorAll('.pictures__slide');
    let currentItem = 0;
    let isEnabled = true;

    function changeCurrentItem(n) {
        currentItem = (n + items.length) % items.length;
    }

    function hideItem(direction) {
        isEnabled = false;
        items[currentItem].classList.add(direction);
        items[currentItem].addEventListener('animationend', function() {
            this.classList.remove('active', direction);
        });
    }

    function showItem(direction) {
        items[currentItem].classList.add('next', direction);
        items[currentItem].addEventListener('animationend', function() {
            this.classList.remove('next', direction);
            this.classList.add('active');
            isEnabled = true;
        });
    }

    function nextItem(n) {
        hideItem('to-left');
        changeCurrentItem(n + 1);
        showItem('from-right');
    }

    function previousItem(n) {
        hideItem('to-right');
        changeCurrentItem(n - 1);
        showItem('from-left');
    }

    document.querySelector('.slider__arrow--previous').addEventListener('click', function() {
        if (isEnabled) {
            previousItem(currentItem);
            slider.classList.toggle('page-main__slider--blue');
        }
    });

    document.querySelector('.slider__arrow--next').addEventListener('click', function() {
        if (isEnabled) {
            nextItem(currentItem);
            slider.classList.toggle('page-main__slider--blue');
        }
    });
})();

(function() {
    const phoneList = document.querySelectorAll('.iphone__phone');
    const verticalScreen = document.querySelector('.iphone__screen--vertical');
    const horizontalScreen = document.querySelector('.iphone__screen--horizontal');

    function switchScreen(evt) {
        if (evt.target.classList.contains('iphone__phone--vertical')) {
            verticalScreen.classList.toggle('hidden');
        } else {
            horizontalScreen.classList.toggle('hidden');
        }
    }

    for (let phone of phoneList) {
        phone.addEventListener('click', switchScreen);
    }
})();

(function() {
    const buttons = document.querySelectorAll('.portfolio__button');
    const portfolio = document.querySelector('.portfolio__picture-list');

    function changePictures(evt) {
        if (!evt.target.classList.contains('portfolio__button--active')) {
            let portfolioPictures = [...portfolio.querySelectorAll('.portfolio__item')];
            portfolioPictures.unshift(portfolioPictures.pop());
            portfolioPictures.forEach(picture => portfolio.append(picture));
        }
        buttons.forEach(button => button.classList.remove('portfolio__button--active'));
        evt.target.classList.add('portfolio__button--active');
    }

    buttons.forEach(button => button.addEventListener('click', changePictures));
})();

(function() {
    let isSwitched = true;
    const portfolio = document.querySelector('.portfolio__picture-list');
    const portfolioPictures = portfolio.querySelectorAll('.portfolio__picture');

    function showBorder(evt) {
        if (evt.target.classList.contains('portfolio__picture--bordered')) {
            isSwitched = false;
        }

        portfolioPictures.forEach(picture => picture.classList.remove('portfolio__picture--bordered'));
        
        if (isSwitched) {
            evt.target.classList.add('portfolio__picture--bordered');
        }

        isSwitched = true;
    }

    portfolioPictures.forEach(image => image.addEventListener('click', showBorder));
})();

(function() {
    const modal = document.querySelector('.modal');
    const sendFormButton = document.querySelector('.contact-form__button');
    const closeModalButton = document.querySelector('.modal__close-button');
    const subject = document.querySelector('.modal__subject');
    const description = document.querySelector('.modal__description');

    function addNodeValue(node, defaultValue) {
        let value = document.querySelector(node).value;
        value = value === '' ? defaultValue : value;
        return value;
    }

    function showModal() {
        modal.classList.remove('hidden');
        addContent();
    }

    function hideModal() {
        modal.classList.add('hidden');
        document.forms[0].reset();
    }

    function addContent() {
        subject.innerText = `Subject: ${addNodeValue('.contact-form__item--subject', 'no subject')}`;
        description.innerText = `Description: ${addNodeValue('.contact-form__item--textarea', 'no description')}`;
    }

    function validate(evt) {
        let requiredFields = [...document.querySelectorAll('[required]')];
        let isValid = field => field.checkValidity();
        if (requiredFields.every(isValid)) {
            evt.preventDefault();
            showModal();
        }
    }

    sendFormButton.addEventListener('click', validate);
    closeModalButton.addEventListener('click', hideModal);
})();