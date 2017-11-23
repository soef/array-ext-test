###Some Array Extensions 

[![NPM version](http://img.shields.io/npm/v/array-ext.svg)](https://www.npmjs.com/package/array-ext)
[![Tests](http://img.shields.io/travis/soef/array-ext/master.svg)](https://travis-ci.org/soef/array-ext)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/soef/array-ext/blob/master/LICENSE)

####Examples:

```js
var arrayExt = require('array-ext');

var arr = [128, 255, 255];

arr.toHex(); // 80 ff ff

//Compare
arr.eq([128, 255]); // true


//new array unique entries
var arr3 = arr.uniquef();

//Remove dupplicated entries
arr.unique(); // arr will be [128, 255]


var arr1 = [
    { ip: '192.168.1.1', name: 'gateway' },
    { ip: '192.168.1.1', name: 'gateway' },
    { ip: '192.168.1.2', name: 'gateway' },
    { ip: '192.168.1.3', name: 'gateway' }
];

arr1.unique('ip'); // by porperty name



arr.contains(128); // true
arr1.contains('ip', {ip: '192.168.1.1'}); // true // by poperty name

var arr2 = [
    { ip: '192.168.1.100', name: 'gateway' },
    { ip: '192.168.1.1', name: 'gateway' },
    { ip: '192.168.1.200', name: 'gateway' },
    { ip: '192.168.1.30', name: 'gateway' }
];

arr1.contains('ip', arr2); // true


// push an entry if not already in
arr.add(128); //

//remove 
arr.removeDup(128); // will remove entry 128

//remove all by array
arr1.removeDup('ip', arr2);

//same than forEach, except counting form the end
//usefull if entries will be deleted in callback
arr.lastThat(function(entry, index, array){
});
```