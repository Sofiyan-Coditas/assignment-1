import { LitElement, html, customElement, css, property } from 'lit-element';

@customElement('toggle-switch')
export class ToggleSwitch extends LitElement {

    ischecked: boolean;
    @property() selectedTheme: string;

    static get styles() {
        return css`
            .toggle-switch {
                height: 20px;
                width: 36px;
                display: inline-block;
                position: relative;
            }
            .toggle-switch input {
                display: none;
            }
            .toggle-switch input:checked + .slider {
                background-color: blue;
            }
            .toggle-switch input:checked + .slider::after {
                -webkit-transform: translateX(10px);
                -ms-transform: translateX(10px);
                transform: translateX(10px);
            }
            .toggle-switch .slider {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background-color: grey;
                transition: 0.5s;
                border-radius: 12px;
                border: 1px solid #fff;
            }
            .toggle-switch .slider::after {
                position: absolute;
                content: "";
                height: 12px;
                width: 16px;
                background-color: #fff;
                left: 4px;
                bottom: 3px;
                transition: 0.5s;
                border-radius: 10px;
            }
        `;
    }

    render() {
        this.ischecked = this.selectedTheme === 'light' ? true : false;
        return html`
        <label class="toggle-switch">
            <input type="checkbox" checked="${this.ischecked}" @change="${ this.themeChanged }">
            <div class="slider"></div>
        </label>
        `;
    }

    themeChanged() {
        this.dispatchEvent(new CustomEvent('changedTheme'));
    }
}

// declare global {
//     interface HTMLElementTagNameMap {
//         'switch': ToggleSwitch;
//     }
// }