/* global chai */

'use strict';

import helloWorld from '../src/index';

const expect = chai.expect;

describe( 'helloWorld', () => {
	it( 'is a function', () => {
		expect( helloWorld ).to.be.a( 'function' );
	} );

	it( 'returns "Hello Hell"', () => {
		const result = helloWorld();
		expect( result ).to.equal( 'Hello Hell' );
	} );
} );
