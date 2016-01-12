'use strict';

// finder for the register register

/*
 *  map an item to the list template
 */
function map(item, filter) {
  return {
    name: item.register,
    href: '/register/' + item.register,
    organisation: item.registry,
    from: item.registry,
    text: item.text
  }
}


module.exports = {
  register: 'register',
  title: 'Registers maintained by HM Government',
  from: 'Cabinet Office',
  registry: 'cabinet-office',
  map: map
};
