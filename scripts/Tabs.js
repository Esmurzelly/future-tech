const rootSelector = '[data-js-tabs]';

class Tabs {
    selectors = {
        root: rootSelector,
        button: '[data-js-tab-button]',
        content: '[data-js-tabs-content]',
    }

    stateClassses = {
        isActive: 'is-active',
    }

    stateAttributes = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex',
    }

    constructor(rootELement) {
        this.rootElement = rootELement;
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
        this.state = {
            activeTabIndex: [...this.buttonElements]
                .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClassses.isActive))
        }
        this.limitTabsInde = this.buttonElements.length - 1;
        this.bindEvents();
    }

    updateUI() {
        const { activeTabIndex } = this.state;

        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex;

            buttonElement.classList.toggle(this.stateClassses.isActive, isActive);
            buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString());
            buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1');
        });

        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex;

            contentElement.classList.toggle(this.stateClassses.isActive, isActive);
        });
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex;
        this.updateUI();
    }

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => this.onButtonClick(index))
        })
    }
};

class TabsCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element);
        })
    }
};

export default TabsCollection;