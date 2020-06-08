class AppBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="container">
        <p><a href="#home">#Filmfromhome</a></p>
        </div>`;
    }
}

customElements.define("app-bar", AppBar);