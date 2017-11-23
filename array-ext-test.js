"use strict";

function nop () {}

function nopx () { nop();}
nopx();
toHex();
toHex();

function toHex (val) {
    return ('0' + val.toString(16)).substr(-2);
}
exports.toHex = toHex;

function arrayToHex(ar, len) {
    let s = "";
    if (len === undefined) len = ar.length;
    for (let i=0; i<len; i++) {
        //s += ar[i].toHex() + ' ';
        s += toHex(ar[i]) + ' ';
    }
    return s;
}
exports.arrayToHex = arrayToHex;

//for node.js version <= 0.12
if ([].find === undefined) {
    Array.prototype.find = function(cb, thisArg) {
        if (thisArg) cb.bind(thisArg);
        for (let i=0; i<this.length; i++) {
            if (cb(this[i], i, this)) return this[i];
        }
        return undefined;
    }
}

Array.prototype.forEachCallback = function forEachCallback (func, readyCallback) {
    let cnt = -1, len = this.length, self = this;

    function next() {
        if (++cnt >= len) {
            return readyCallback && readyCallback();
        }
        //func(arr[cnt], doit);
        func(next, self[cnt], cnt, self);
    }
    next();
};
Array.prototype.toHex = function () {
    return arrayToHex(this);
};
Array.prototype.eq = function (arr) {
    if(arr === undefined) return false;
    return this.length===arr.length && this.every(function(v,i) { return v === arr[i]});
};
Array.prototype.unique = function (cb) {
    let oldLen = this.length;
    switch (typeof cb) {
        case 'undefined':
            for (let i = 0; i < this.length; i++) {
                let v = this [i];
                for (let j = i + 1; j < this.length; j++) {
                    if (this[j] === v) {
                        this.splice(j, 1);
                        j--;
                    }
                }
            }
            break;
        case 'string':
            for (let i = 0; i < this.length; i++) {
                let v = this [i];
                for (let j = i + 1; j < this.length; j++) {
                    if (this[j][cb] === v [cb]) {
                        this.splice(j, 1);
                        j--;
                    }
                }
            }
            break;
        case 'function':
            for (let i = 0; i < this.length; i++) {
                let v = this [i];
                for (let j = i + 1; j < this.length; j++) {
                    if (cb(this[j], v)) {
                        this.splice(j, 1);
                        j--;
                    }
                }
            }
            break;
    }
    return oldLen !== this.length;
};

Array.prototype.uniquef = function (cb) {
    let a = [];
    switch (typeof cb) {
        case 'undefined':
            this.forEach(function(v) {
                if (!a.find(function (f) {
                        return f === v;
                    })) {
                    a.push(v);
                }
            });
            break;
        case 'string':
            this.forEach(function (v) {
                if (!a.find(function (f) {
                        return f [cb] === v [cb];
                    })) {
                    a.push(v);
                }
            });
            break;
        case 'function':
            this.forEach(function(v) {
                if (!a.find(function (f) {
                        return cb (f, v);
                    })) {
                    a.push(v);
                }
            });
            break;
    }
    return a;
};

//Array.prototype.contains = function(propertyName, entry) {
//	return this.find(function(v) {
//		return v[propertyName] === entry[propertyName];
//	})
//};
Array.prototype.contains = function(propertyName, entry) {
    if (entry === undefined) {
        return this.find(function (v) {
                return v === propertyName;
            });
    }
    if(!Array.isArray(entry)) {
        return this.find(function (v) {
            return v[propertyName] === entry[propertyName];
        })
    }
    for(let i=entry.length-1; i>=0; i--) {
        let found = this.find(function(v) {
            return v[propertyName] === entry[i][propertyName];
        });
        if (found) return found;
    }
    return false;
};


Array.prototype.add = function (v) {
    if (Array.isArray(v)) {
    	v.forEach(function(e) {
    		this.add(e);
		}.bind(this));
    	return;
	}
	if (!this.contains(v)) {
        this.push(v);
        return true;
    }
    return false;
};

Array.prototype.lastThat = function (cb) {
    for (let i=this.length-1; i>=0; i--) {
        cb (this[i], i, this);
    }
};

Array.prototype.removeDup = function (propName, arr) {
    if (!this.length) return 0;
    let oldLen = this.length;
    if (arr === undefined) {
        arr = propName;
        propName = undefined;
    }
    if (!Array.isArray(arr)) {
        if (!propName) {
            for (let i = this.length - 1; i >= 0; i--) {
                if (this[i] === arr) {
                    this.splice(i, 1);
                }
            }
        } else {
            for (let i = this.length - 1; i >= 0; i--) {
                if (this[i][propName] === arr[propName]) {
                    this.splice(i, 1);
                }
            }
        }
        return oldLen - this.length;
    }

    // for (let i=arr.length-1; i>=0; i--) {
    //     this.removeDup(propName, arr[i]);
    //     while (i >= arr.length) i--;
    // }
    arr.forEach(function(v) {
        this.removeDup(propName, v);
    }.bind(this));
    return oldLen - this.length;
};


