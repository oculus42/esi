//
// Test the ESI proxy
//

var ESI = require('../src/esi.js');

var ESIConnect = require('../index.js');

var expect = require('expect.js');


//
// SETUP DUMMY SERVER
// This reproduces a third party OAuth and API Server
//

var connect = require('connect');
var http = require('http');

var request = require('supertest');



describe("ESI", function(){

	var srv;

	before(function(){
		var test_port = 3333;

		var test = connect()
			.use( function( req, res ){
		//		console.log( req.url );
				res.write( req.url );
				res.end();
			});

		srv = http.createServer(test).listen(test_port);
	});

	after(function(){
		srv.close();
	});


	it("should return a promise object", function(){
		var esi = ESI('text');
		expect( esi ).to.have.property( 'then' );
	});

	it("should not affect regular content", function(done){
		var str = 'text';
		var esi = ESI( str );
		esi.then(function( response ){
			expect( response ).to.be.eql( str );
			done();
		});
	});

	it("should follow the paths in an ESI tag", function(done){
		var str = '<esi:include src="http://localhost:3333/text"></esi:include>';
		var esi = ESI( str );
		esi.then(function( response ){
			expect( response ).to.be.eql( '/text' );
			done();
		});
	});

	it("should follow the paths in multiple ESI tags", function(done){
		var str = '<esi:include ignore src="http://localhost:3333/text1" ignorethis>\n ignore this\n </esi:include>, <esi:include ignoreme src="http://localhost:3333/text2"></esi:include>,<esi:include src="http://localhost:3333/text3"></esi:include>';
		var esi = ESI( str );
		esi.then(function( response ){
			expect( response ).to.be.eql( '/text1, /text2,/text3' );
			done();
		});
	});

});





describe("ESI connect", function(){

	var srv, test;
	var test_port = 3334,
		localhost = "http://localhost:"+test_port+"/";

	before(function(){

		// The test server merely writes out the the GET path in the body of the response
		// This makes testing easier, since each test can effectively mock its own environment

		test = connect()
			.use( ESIConnect )
			.use( function( req, res ){
				// Check if the request URL is returning a number?
				var m;
				if( ( m = req.url.match(/^\/(\d+)$/) ) ){
					res.writeHead(parseInt(m[1],10),{});
				}
				res.write( decodeURIComponent(req.url).replace(/^\/|\/$/g,'') );
				res.end();
			});

		srv = http.createServer(test).listen(test_port);
	});

	after(function(){
		srv.close();
	});


	it("should pass through non-esi text", function(done){

		request(test)
			.get('/hello')
			.expect(200, 'hello')
			.end(done);
	});


	it("should follow the includes in ESI tags", function(done){

		var resolve = 'hello';
		var snipet = '<esi:include src="'+ localhost + resolve +'"></esi:include>'+resolve;

		request(test)
			.get('/'+(snipet))
			.expect(200, resolve + resolve)
			.end(done);
	});

	it("should return the ESI fragment if it can't honor the request", function(done){

		var snipet = '<esi:include src="'+ localhost + 404 + '"></esi:include>';

		request(test)
			.get('/'+(snipet))
			.expect(200, snipet)
			.end(function(err, res){
				if (err) throw err;
				done();
			});
	});

	it("should use the alt attributes if the first returns an error status", function(done){

		var resolve = 'hello';
		var snipet = '<esi:include src="'+ localhost + 404 + '" " alt="' + localhost + resolve +'"></esi:include>';

		request(test)
			.get('/'+(snipet))
			.expect(200, resolve)
			.end(function(err, res){
				if (err) throw err;
				done();
			});
	});

});