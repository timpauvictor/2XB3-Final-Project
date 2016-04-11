QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("fish DB get completeness", function( assert ) {
		console.log("Attempting to get all points");
		var jQueryPromise = $.get('http://localhost:8080/api/fishPoints', { //however, this has a different URL so we get all the fish points instead
			dataType: "jsonp"
		});
		var realPromise = Promise.resolve(jQueryPromise);
		realPromise.then(function(val) {
			// console.log(val);
			assert.ok(val.length == 3491, "Passed");
		});
});