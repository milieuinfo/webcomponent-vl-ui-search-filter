import {NativeVlElement, define} from '/node_modules/vl-ui-core/vl-core.js';

/**
 * VlSearchFilter
 * @class
 * @classdesc
 *
 * @extends VlElement
 *
 * @property title - De titel van deze search filter.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-search-filter/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-search-filter/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-search-filter.html|Demo}
 *
 */
export class VlSearchFilter extends NativeVlElement(HTMLDivElement) {

  static get _observedAttributes() {
    return ['title'];
  }

  static get _observedClassAttributes() {
    return ['alt']
  }

  _titleChangedCallback(oudeWaarde, nieuweWaarde) {
    const titleElement = this.querySelector('p.' + this._elementPrefix + 'intro');
    if (titleElement != null) {
      titleElement.textContent = nieuweWaarde;
    } else {
      const newTitleElement = document.createElement('p');
      newTitleElement.setAttribute('class', this._elementPrefix + 'intro');
      newTitleElement.textContent = nieuweWaarde;
      this.insertBefore(newTitleElement, this.firstChild);
    }
  }

  connectedCallback() {
    this.classList.add('vl-search-filter');
    this.querySelectorAll('form').forEach(
        form => form.classList.add(this._elementPrefix + 'form'));
    this.querySelectorAll('form > section').forEach(
        section => section.classList.add(this._elementPrefix + 'section'));
    this.querySelectorAll('form > section > h2').forEach(
        title => title.classList.add(this._elementPrefix + 'section-title'));
    this.querySelectorAll('form > section > div').forEach(
        field => field.classList.add(this._elementPrefix + 'field'));
    this.querySelectorAll('form > section > div > label').forEach(
        label => label.classList.add(this._elementPrefix + 'field__label'));
    this.querySelectorAll('div[footer]').forEach(
        footer => footer.classList.add(this._elementPrefix + 'footer'));
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

  get _stylePath() {
    return '../style.css';
  }

}

define('vl-search-filter', VlSearchFilter, {extends: 'div'});
