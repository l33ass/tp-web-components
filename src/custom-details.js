export class CustomDetails extends HTMLElement {

    /**
     * CustomDetails constructor.
     */
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        const template = document.getElementById("custom-details").content;
        this.shadowRoot.appendChild(template.cloneNode(true));

        this.$details = this.shadowRoot.querySelector('details');
    }

    /**
     * Render styles and attach event handlers
     * on component initialization.
     */
    connectedCallback() {
        this.renderStyles();
        this.attachHandlers();
    }

    /**
     * Cleanup events on component destruction.
     */
    disconnectedCallback() {
        window.removeEventListener('keydown', this.closeDetailsListener);
    }

    /**
     * Attach event handlers to nodes.
     */
    attachHandlers() {
        // save listeners in variables
        this.closeDetailsListener = this.closeDetailsOnEscape.bind(this);
        // attach handlers
        this.$details.addEventListener('mouseenter', this.openDetails.bind(this));
        this.$details.addEventListener('focusin', this.openDetails.bind(this));
        window.addEventListener('keydown', this.closeDetailsListener);
    }

    /**
     * Attach styles to the shadow DOM.
     */
    renderStyles() {
        const stylesElement = document.createElement('style');
        const styles = `
            <style>
            </style>
        `;
        stylesElement.innerHTML = styles;
        this.shadowRoot.appendChild(stylesElement);
    }

    /**
     * Function to open details.
     */
    openDetails() {
        this.$details.setAttribute('open', 'true');
    }

    /**
     * Function to close details.
     */
    closeDetails() {
        this.$details.removeAttribute('open');
    }

    /**
     * Function to close details on escape button press.
     * @param {KeyboardEvent} e 
     */
    closeDetailsOnEscape(e) {
        if (e.key === 'Escape') {
            this.closeDetails();
        }
    }
}
customElements.define('custom-details', CustomDetails);
