class BaseComponent {
    constructor() {
        if(this.constructor === BaseComponent) throw new Error("Нельзя создать экземпляр абстрактного класса!")
    }

    getProxyState(initialState) {
        return new Proxy(initialState, {
            get: (target, prop) => {
                return target[prop];
            },
            set: (target, prop, newValue) => {
                const oldValue = target[prop];

                target[prop] = newValue;

                if(newValue !== oldValue) this.updateUI();

                return true;
            },
        })
    };

    updateUI() {
        throw new Error("Надо реализовать этот ебучий метод")
    }
};

export default BaseComponent;