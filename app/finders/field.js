'use strict';

// finder for the field register

/*
 *  map an item to the list template
 */
function map(item, filter) {
  return {
    name: item.register,
    href: '',
    organisation: item.registry,
    from: item.registry,
    text: item.text
  }
}


module.exports = {
  register: 'field',
  title: 'Fields used by registers maintained by HM Government',
  from: 'Cabinet Office',
  registry: 'cabinet-office',
  map: map
};
