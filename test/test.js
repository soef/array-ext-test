var expect = require('chai').expect;
var arrayExt = require(__dirname + '/../array-ext');
 
var arr = [128, 255, 255];
var arr1 = [
    { ip: '192.168.1.1', name: 'gateway' },
    { ip: '192.168.1.1', name: 'gateway' },
    { ip: '192.168.1.2', name: 'gateway' },
    { ip: '192.168.1.3', name: 'gateway' }
];
var arr2 = [
    { ip: '192.168.1.100', name: 'gateway' },
    { ip: '192.168.1.1', name: 'gateway' },
    { ip: '192.168.1.200', name: 'gateway' },
    { ip: '192.168.1.30', name: 'gateway' }
];

describe('Test array-ext', function() {
    before('Test before', function (_done) {
        this.timeout(600000); // because of first install from npm
        _done();
    });

    it('uniquef()', function (done) {
        this.timeout(1500);
        var v = arr.uniquef();
        //expect(v).to.be.null;
        // expect(obj).to.be.an('object');
        expect(v).not.to.be.null;
        expect(v).to.be.an('array');
        expect(v.length).to.equal(2);
        done();
    });

    it('unique()', function (done) {
		this.timeout(1000);
        arr.unique();
        expect(arr.length).to.equal(2);
        // expect(devices).to.be.an('object');
        // expect(devices.getval('device.channel.state1', 'default')).to.equal('default');
        // expect(devices.getval('device.channel.state')).to.equal('Value');
        done();
    });
	it('toHex()', function(done) {
		expect(arr.toHex()).to.equal('80 ff ');
		done();
	});
    it('contains(number)', function(done) {
        expect(arr.contains(128)).to.equal(128);
        done();
    });
    it('contains(propertyName, object)', function(done) {
        expect(arr1.contains('ip', {ip: '192.168.1.1'})).to.equal(arr1[0]);
        done();
    });
    it('contains(propertyName, array)', function(done) {
        expect(arr1.contains('ip', arr2)).to.equal(arr1[0]);
        done();
    });
    it('add(number)', function(done) {
        var len = arr.length;
        arr.add(128);
        arr.add(1);
        expect(arr.length).to.equal(len+1);
        done();
    });
    it('add(array)', function(done) {
        var a1 = [1,2,3,5,7];
        var a2 = [1,2,4,6];
        a1.add(a2);
        expect(a1.length).to.equal(7);
        expect(a1.eq([1,2,3,5,7,4,6])).to.equal(true);
        done();
    });
    
    
    after('Test after', function (done) {
        this.timeout(10000);
        done();
    });
});
