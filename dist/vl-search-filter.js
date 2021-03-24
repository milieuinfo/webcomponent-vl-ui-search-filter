import {nativeVlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-titles/dist/vl-titles.js';

/**
 * VlSearchFilter
 * @class
 * @classdesc De search filter laat de gebruiker toe om de zoekresulten te verfijnen.
 *
 * @extends HTMLDivElement
 * @mixes nativeVlElement
 *
 * @property {string} data-vl-title - De titel van deze search filter.
 * @property {string} data-vl-alt - Alternatieve (transparante) achtergrond.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-search-filter/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-search-filter/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-search-filter.html|Demo}
 */
export class VlSearchFilter extends nativeVlElement(HTMLDivElement) {
  static get _observedAttributes() {
    return ['title'];
  }

  static get _observedClassAttributes() {
    return ['alt', 'mobile-modal'];
  }

  connectedCallback() {
    this.classList.add('vl-search-filter');
    this.querySelectorAll('form').forEach((form) => form.classList.add(`${this._elementPrefix}form`));
    this.querySelectorAll('form > section').forEach((section) => section.classList.add(`${this._elementPrefix}section`));
    this.querySelectorAll('form > section > h2').forEach((title) => title.classList.add(`${this._elementPrefix}section-title`));
    this.querySelectorAll('form > section > div').forEach((field) => field.classList.add(`${this._elementPrefix}field`));
    this.querySelectorAll('form > section > div > label').forEach((label) => label.classList.add(`${this._elementPrefix}field__label`));
    this.querySelectorAll('form > div').forEach((div) => div.classList.add(`${this._elementPrefix}field`));
    this._footerElements.forEach((footer) => footer.classList.add(`${this._elementPrefix}footer`));
  }

  get formData() {
    return new FormData(this.querySelector('form'));
  }

  get _classPrefix() {
    return this._elementName + '--';
  }

  get _elementPrefix() {
    return this._elementName + '__';
  }

  get _elementName() {
    return 'vl-search-filter';
  }

  get _titleElement() {
    return this._introElement || this._headerElement;
  }

  get _introElement() {
    return this.querySelector(`.${this._elementPrefix}intro`);
  }

  get _headerElement() {
    return this.querySelector(`.${this._elementPrefix}header-modal`);
  }

  get _footerElements() {
    return [...this.querySelectorAll('form ~ div')];
  }

  get _submitButton() {
    return this.querySelector('button[type="submit"]');
  }

  get _title() {
    return this.getAttribute('data-vl-title');
  }

  _titleChangedCallback(oldValue, newValue) {
    if (this._titleElement == null) {
      this.insertBefore(this.__createTitleElement(), this.firstChild);
    } else {
      this._titleElement.textContent = newValue;
    }
  }

  _mobileModalChangedCallback(oldValue, newValue) {
    if (this._titleElement) {
      this._titleElement.remove();
    }

    if (newValue != undefined) {
      this.insertBefore(this.__createHeaderElement(), this.firstChild);
      this.__moveFooterElementsToHeader();
      this.__convertSubmitButtonContainerToFooter();
    } else {
      this._titleChangedCallback(undefined, this._title);
    }
  }

  __createTitleElement() {
    const title = document.createElement('p');
    title.classList.add(`${this._elementPrefix}intro`);
    title.textContent = this._title;
    return title;
  }

  __createHeaderElement() {
    const header = document.createElement('div');
    header.classList.add(`${this._elementPrefix}header-modal`);
    const title = document.createElement('h2', 'vl-h2');
    title.textContent = this._title;
    header.appendChild(title);
    return header;
  }

  __moveFooterElementsToHeader() {
    this._footerElements.flatMap((element) => [...element.children]).forEach((element) => {
      this._titleElement.appendChild(element);
      element.classList.add(`${this._elementPrefix}header__clear`);
    });
  }

  __convertSubmitButtonContainerToFooter() {
    if (this._submitButton) {
      this._submitButton.setAttribute('data-vl-block', '');
      const container = this._submitButton.parentElement;
      container.classList.add(`${this._elementPrefix}footer-modal`);
      this._element.appendChild(container);
    }
  }
}

define('vl-search-filter', VlSearchFilter, {extends: 'div'});
