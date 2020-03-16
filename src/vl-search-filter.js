import { NativeVlElement, define } from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlSearchFilter
 * @class
 * @classdesc
 *
 * @extends VlElement
 *
 * @property data-vl-title - De titel van deze search filter.
 * @property alt - Alternatieve (transparante) achtergrond.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-search-filter/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-search-filter/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-search-filter.html|Demo}
 *
 */
export class VlSearchFilter extends NativeVlElement(HTMLDivElement) {
  static get _observedAttributes() {
    return ['data-vl-title'];
  }

  static get _observedClassAttributes() {
    return ['alt'];
  }

  _data_vl_titleChangedCallback(oldValue, newValue) {
    let titleElement = this.querySelector('p.' + this._elementPrefix + 'intro');
    if (titleElement == null) {
      titleElement = document.createElement('p');
      titleElement.setAttribute('class', this._elementPrefix + 'intro');
      titleElement.textContent = newValue;
      this.insertBefore(titleElement, this.firstChild);
    }
    titleElement.textContent = newValue;
  }

  connectedCallback() {
    this.classList.add('vl-search-filter');
    this.querySelectorAll('form').forEach(form => form.classList.add(this._elementPrefix + 'form'));
    this.querySelectorAll('form > section').forEach(section => section.classList.add(this._elementPrefix + 'section'));
    this.querySelectorAll('form > section > h2').forEach(title => title.classList.add(this._elementPrefix + 'section-title'));
    this.querySelectorAll('form > section > div').forEach(field => field.classList.add(this._elementPrefix + 'field'));
    this.querySelectorAll('form > section > div > label').forEach(label => label.classList.add(this._elementPrefix + 'field__label'));
    this.querySelectorAll('form ~ div').forEach(footer => footer.classList.add(this._elementPrefix + 'footer'));
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

  get formData() {
    return new FormData(this.querySelector('form'));
    const pairs = {};
    for (let entry of formData.entries()) {
      pairs[entry[0]] = entry[1];
    }
    return pairs;
  };
}

define('vl-search-filter', VlSearchFilter, { extends: 'div' });
