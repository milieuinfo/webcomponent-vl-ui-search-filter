import { VlElement, define } from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/src/vl-search-filter.js';

export class VlSearchFilterTest extends VlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
          @import '/src/style.css';
      </style>

      <div is="vl-search-filter">
        <slot></slot>
      </div>
    `);
  }
}

define('vl-search-filter-test', VlSearchFilterTest);
