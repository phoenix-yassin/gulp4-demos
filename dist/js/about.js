"use strict";

var about = {
  name: 'yumeng',
  sayname: function sayname() {
    return this.name;
  }
};
var dom = document.createElement('span');
dom.innerText = 'append dom';
document.querySelector('body').appendChild(dom);