import { NativeVlElement, define } from 'vl-ui-core';

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
    const form = this._form || this._slotForm;
    if (form) {
      const parent = form.parentElement;
      parent.querySelector('form').classList.add(this._elementPrefix + 'form');
      parent.querySelectorAll('form > section').forEach(section => section.classList.add(this._elementPrefix + 'section'));
      parent.querySelectorAll('form > section > h2').forEach(title => title.classList.add(this._elementPrefix + 'section-title'));
      parent.querySelectorAll('form > section > div').forEach(field => field.classList.add(this._elementPrefix + 'field'));
      parent.querySelectorAll('form > section > div > label').forEach(label => label.classList.add(this._elementPrefix + 'field__label'));
      parent.querySelectorAll('form ~ div').forEach(footer => footer.classList.add(this._elementPrefix + 'footer'));
    }
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

  get _form() {
    return this.querySelector('form');
  }

  get _slotForm() {
    const slot = this.querySelector('slot');
    if (slot) {
      return slot.assignedElements().find((element) => element.tagName == 'FORM');
    }
  }

  get _hasForm() {
    return !!this.querySelector('form');
  }

  get formData() {
    if (this._hasForm) {
      return new FormData(this._form);
    } else {
      const form = document.createElement('form');
      form.append(... this._slotForm.children);
      return new FormData(form);
    }
  }
}

define('vl-search-filter', VlSearchFilter, { extends: 'div' });

