export class CurrentTime extends HTMLElement {

    /**
     * Define attribute
     */
    static get observedAttributes() {
        return ['format'];
    }

    /**
     * Update rendered elements on update
     */
    attributeChangedCallback(attr, oldVal, newVal) {
        this[attr] = newVal;

        if (this.$time) {
            this.render();
        }
    }

    /**
     * On component connection, render its contents and set
     * time update interval
     */
    connectedCallback() {
        this.initialRender();
        this.setTimeUpdateInterval();
        this.setupHandlers();
    }

    /**
     * On disconnect, destroy the time interval
     */
    disconnectedCallback() {
        clearInterval(this.timeInterval);
    }

    /**
     * Add event listeners
     */
    setupHandlers() {
        this.$select.addEventListener('change', (e) => {
            this.setAttribute('format', e.target.value);
        });
    }

    /**
     * Update time element
     * @returns {string}
     */
    updateTime() {
        if (this.format === 'utc') {
            return new Date().toUTCString();
        } else {
            return new Date().toLocaleString();
        }
    }

    /**
     * Update title element
     */
    updateTitle() {
        return `Time - ${this.format ?? 'local'}`;
    }

    /**
     * If time interval doesn't exist, set time update interval
     */
    setTimeUpdateInterval() {
        if (this.timeInterval) {
            return;
        }
        this.timeInterval = setInterval(() => {
            this.$time.textContent = this.updateTime();
        }, 1000);
    }

    /**
     * Initial component render
     */
    initialRender() {
        this.innerHTML = `
        <section class='currentTime'>
            <header class='currentTime__header'>
                <h2 class='currentTime__title'>${this.updateTitle()}</h2>
                <select>
                    <option value='local'>--Timezone--</option>
                    <option value='utc'>UTC</option>
                    <option value='local'>Local</option>
                </select>
            </header>
            <time class='currentTime__time'>${this.updateTime()}</time>
        </section>
        `;
        this.$time = this.querySelector('time');
        this.$title = this.querySelector('.currentTime__title');
        this.$select = this.querySelector('select');
    }

    /**
     * Update render
     */
    render() {
        this.$time.textContent = this.updateTime();
        this.$title.textContent = this.updateTitle();
    }
}
customElements.define('current-time', CurrentTime);
