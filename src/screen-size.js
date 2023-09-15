export class ScreenSize extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.unit = 'px';
        this.shadowRoot.innerHTML = this.initialRender();
        this.$size = this.shadowRoot.querySelector('.screenSize__size');
        this.$button = this.shadowRoot.querySelector('.screenSize__button');
    }

    /**
     * Define attribute
     */
    static get observedAttributes() {
        return ['unit'];
    }

    /**
     * Update rendered elements on update
     */
    attributeChangedCallback(attr, oldVal, newVal) {
        this[attr] = newVal;

        if (attr === 'unit') {
            this.unit = newVal === 'rem' ? 'rem' : 'px';
        }

        this.update();
    }

    /**
     * Setup handlers on component connection
     */
    connectedCallback() {
        this.setupHandlers();
    }

    /**
     * Cleanup component on destroy
     */
    disconnectedCallback() {
        window.removeEventListener('resize', this.resizeListener);
    }

    /**
     * Setup this components' handlers
     */
    setupHandlers() {
        this.resizeListener = this.update.bind(this);
        window.addEventListener('resize', this.resizeListener);
        this.$button.addEventListener('click', this.switchUnit.bind(this));
    }

    /**
     * Initial component render
     * @returns {string} HTML
     */
    initialRender() {
        return `
            <style>
                .screenSize {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    background: var(--theme-light);
                    border-radius: 10px;
                }
                .screenSize__size {
                    margin: 0;
                }
            </style>
            <section class='screenSize'>
                <p class='screenSize__size'>${this.updateScreenSize()}</p>
                <button class='screenSize__button'>switch</button>
            </section>
        `;
    }

    /**
     * Function to call on each attribute change
     */
    update() {
        this.$size.textContent = this.updateScreenSize();
    }

    /**
     * Update screen size
     * @returns {string}
     */
    updateScreenSize() {
        const width = this.unit === 'px' ?
            window.innerWidth :
            window.innerWidth / this.getFontSize();
        return width + this.unit;
    }

    /**
     * Switch unit from px to rem or the other way round
     */
    switchUnit() {
        this.setAttribute('unit', this.unit === 'px' ? 'rem' : 'px');
    }

    /**
     * Get font size by default
     * @returns {number}
     */
    getFontSize() {
        return parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
}
customElements.define('screen-size', ScreenSize);