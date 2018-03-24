'use strict';

function checkSelectorEngine( selectorEngine ) {
	return typeof selectorEngine === 'object' && typeof selectorEngine.find === 'function';
}

function determineContext( context ) {
	if ( context instanceof BEMQuery ) { //	eslint-disable-line no-use-before-define
		context = context.elements[ 0 ];
	}

	if ( !( context instanceof HTMLElement ) && context !== document ) {
		context = document;
	}

	return context;
}

function fetchElements( query, context, selectorEngine ) {
	if ( !query ) {
		throw new TypeError( 'Selector must be set.' );
	}
	if ( typeof query === 'string' ) {
		return selectorEngine.find( query, context ).elements;
	} else if ( query instanceof HTMLElement ) {
		return [
			query
		];
	} else if ( query instanceof  BEMQuery ) { //	eslint-disable-line no-use-before-define
		return query.elements;
	} else if ( typeof query === 'object' ) {
		return Array.from( query );
	} else {
		throw new TypeError( 'Selector must be a string, object, array or DOM element.' );
	}

}

class BEMQuery {
	constructor( query, context, selectorEngine ) {

		if ( !checkSelectorEngine( selectorEngine ) ) {
			throw new TypeError( 'SelectorEngine must be an object with find method defined.' );
		}

		this.selectorEngine = selectorEngine;

		context = determineContext( context );

		this.elements = fetchElements( query, context, selectorEngine );

	}

	[ Symbol.iterator ]() {
		let i = 0;
		const elements = this.elements;
		const selectorEngine = this.selectorEngine;

		return {
			next() {
				if ( i < elements.length ) {
					const element = elements[ i++ ];

					return {
						value: new BEMQuery( [ element ], document, selectorEngine ),
						done: false
					};
				}

				return {
					done: true
				};
			}
		};
	}

	/**
	 * Gets element with given index.
	 *
	 * @param {Number} index Element's index.
	 * @return {BEMQuery} New BEMQuery instance with fetched element
	 * as an only element in the collection.
	 */
	get( index ) {
		index = Number( index );

		if ( Number.isNaN( index ) ) {
			throw new TypeError( 'Index must be a correct Number.' );
		} else if ( index < 0 ) {
			throw new RangeError( 'Index must be greater or equal to 0.' );
		} else if ( index > ( this.elements.length - 1 ) ) {
			throw new RangeError( 'Index cannot be greater than collection\'s length.' );
		}

		return new BEMQuery( this.elements[ index ], document, this.converter, this.selectorEngine );
	}
}

export default BEMQuery;
