/* global chai */

'use strict';

import factory from '../src/factory';
import defaultConfigConverter from '../src/converter/defaultConfig';
import SelectorEngine from '../src/SelectorEngine';

const expect = chai.expect;

describe( 'factory', () => {
	it( 'is a function', () => {
		expect( factory ).to.be.a( 'function' );
	} );

	it( 'returns a SelectorEngine instance', () => {
		const result = factory();

		expect( result ).to.be.an.instanceof( SelectorEngine );
	} );

	it( 'pass default config to Converter instance', () => {
		const result = factory();

		expect( result.converter.config ).to.deep.equal( defaultConfigConverter );
	} );

	it( 'could alter Converter configuration', () => {
		const config = {
			'hublabubl': true
		};
		const result = factory( config );

		expect( result.converter.config ).to.deep.equal( config );
	} );
} );
