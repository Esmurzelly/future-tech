import pxToRem from './utils/pxToRem.js';

const rootElement = '[data-js-expandable-content]';

class ExpandableContent {
    selectors = {
        root: rootElement,
        button: '[data-js-expandable-content-button]'
    }

    stateClasses = {
        isExpanded: 'is-expanded',
    }

    animationParams = {
        duration: 500,
        easing: 'ease'
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.buttonElement = this.rootElement.querySelector(this.selectors.button);
        this.bindEvents();
    }

    exand() {
        const { offsetHeight, scrollHeight } = this.rootElement;

        this.rootElement.classList.add(this.stateClasses.isExpanded);
        this.rootElement.animate([
            {
                maxHeight: `${pxToRem(offsetHeight)}rem`,
            },
            {
                maxHeight: `${pxToRem(scrollHeight)}rem`,
            }
        ], this.animationParams)
    }

    onButtonClick = () => {
        this.exand();
    }

    bindEvents() {
        this.buttonElement.addEventListener('click', this.onButtonClick);

    }
}

class ExpandableContentCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootElement).forEach((element) => {
            new ExpandableContent(element);
        })
    }
}

export default ExpandableContentCollection;