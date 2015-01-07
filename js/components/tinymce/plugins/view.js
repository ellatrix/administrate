var $ = require( 'jquery' );
var _ = require( 'underscore' );
var Backbone = require( 'backbone' );
var tinymce = window.tinymce;
var shortcode = require( '../../../utils/shortcode' );
var views = {};
var instances = {};
var viewOptions = ['encodedText'];

var View = function( options ) {
	options = options || {};
	this.type = options.type;
	_.extend( this, _.pick( options, viewOptions ) );
	this.initialize.apply( this, arguments );
};

_.extend( View.prototype, {
	initialize: function() {},
	getHtml: function() {
		return '';
	},
	loadingPlaceholder: function() {
		return '' +
			'<div class="loading-placeholder">' +
				'<div class="dashicons dashicons-admin-media"></div>' +
				'<div class="wpview-loading"><ins></ins></div>' +
			'</div>';
	},
	render: function( force ) {
		if ( force || ! this.rendered() ) {
			this.unbind();

			this.setContent(
				'<p class="wpview-selection-before">\u00a0</p>' +
				'<div class="wpview-body" contenteditable="false">' +
					'<div class="toolbar mce-arrow-down">' +
						( _.isFunction( views[ this.type ].edit ) ? '<div class="dashicons dashicons-edit edit"></div>' : '' ) +
						'<div class="dashicons dashicons-no remove"></div>' +
					'</div>' +
					'<div class="wpview-content wpview-type-' + this.type + '">' +
						( this.getHtml() || this.loadingPlaceholder() ) +
					'</div>' +
					( this.overlay ? '<div class="wpview-overlay"></div>' : '' ) +
				'</div>' +
				'<p class="wpview-selection-after">\u00a0</p>',
				'wrap'
			);

			$( this ).trigger( 'ready' );

			this.rendered( true );
		}
	},
	unbind: function() {},
	getEditors: function( callback ) {
		var editors = [];

		_.each( tinymce.editors, function( editor ) {
			if ( editor.plugins.wpview ) {
				if ( callback ) {
					callback( editor );
				}

				editors.push( editor );
			}
		}, this );

		return editors;
	},
	getNodes: function( callback ) {
		var nodes = [],
			self = this;

		this.getEditors( function( editor ) {
			$( editor.getBody() )
			.find( '[data-wpview-text="' + self.encodedText + '"]' )
			.each( function ( i, node ) {
				if ( callback ) {
					callback( editor, node, $( node ).find( '.wpview-content' ).get( 0 ) );
				}

				nodes.push( node );
			} );
		} );

		return nodes;
	},
	setContent: function( html, option ) {
		this.getNodes( function ( editor, node, content ) {
			var el = ( option === 'wrap' || option === 'replace' ) ? node : content,
				insert = html;

			if ( _.isString( insert ) ) {
				insert = editor.dom.createFragment( insert );
			}

			if ( option === 'replace' ) {
				editor.dom.replace( insert, el );
			} else {
				el.innerHTML = '';
				el.appendChild( insert );
			}
		} );
	},
	setError: function( message, dashicon ) {
		this.setContent(
			'<div class="wpview-error">' +
				'<div class="dashicons dashicons-' + ( dashicon ? dashicon : 'no' ) + '"></div>' +
				'<p>' + message + '</p>' +
			'</div>'
		);
	},
	rendered: function( value ) {
		var notRendered;

		this.getNodes( function( editor, node ) {
			if ( value != null ) {
				$( node ).data( 'rendered', value === true );
			} else {
				notRendered = notRendered || ! $( node ).data( 'rendered' );
			}
		} );

		return ! notRendered;
	}
} );

View.extend = Backbone.View.extend;

module.exports = {

	/**
	 * Registers a new TinyMCE view.
	 *
	 * @param type
	 * @param constructor
	 *
	 */
	register: function( type, constructor ) {
		var defaultConstructor = {
				type: type,
				View: {},
				toView: function( content ) {
					var match = shortcode.next( this.type, content );

					if ( ! match ) {
						return;
					}

					return {
						index: match.index,
						content: match.content,
						options: {
							shortcode: match.shortcode
						}
					};
				}
			};

		constructor = _.defaults( constructor, defaultConstructor );
		constructor.View = View.extend( constructor.View );

		views[ type ] = constructor;
	},

	/**
	 * Returns a TinyMCE view constructor.
	 *
	 * @param type
	 */
	get: function( type ) {
		return views[ type ];
	},

	/**
	 * Unregisters a TinyMCE view.
	 *
	 * @param type
	 */
	unregister: function( type ) {
		delete views[ type ];
	},

	/**
	 * The editor DOM is being rebuilt, run cleanup.
	 */
	unbind: function() {
		_.each( instances, function( instance ) {
			instance.unbind();
		} );
	},

	/**
	 * Scans a `content` string for each view's pattern, replacing any
	 * matches with wrapper elements, and creates a new instance for
	 * every match, which triggers the related data to be fetched.
	 *
	 * @param content
	 */
	toViews: function( content ) {
		var pieces = [ { content: content } ],
			self = this,
			current;

		_.each( views, function( view, viewType ) {
			current = pieces.slice();
			pieces  = [];

			_.each( current, function( piece ) {
				var remaining = piece.content,
					result;

				// Ignore processed pieces, but retain their location.
				if ( piece.processed ) {
					pieces.push( piece );
					return;
				}

				// Iterate through the string progressively matching views
				// and slicing the string as we go.
				while ( remaining && (result = view.toView( remaining )) ) {
					// Any text before the match becomes an unprocessed piece.
					if ( result.index ) {
						pieces.push({ content: remaining.substring( 0, result.index ) });
					}

					// Add the processed piece for the match.
					pieces.push({
						content: self.toView( viewType, result.content, result.options ),
						processed: true
					});

					// Update the remaining content.
					remaining = remaining.slice( result.index + result.content.length );
				}

				// There are no additional matches. If any content remains,
				// add it as an unprocessed piece.
				if ( remaining ) {
					pieces.push({ content: remaining });
				}
			});
		});

		return _.pluck( pieces, 'content' ).join('');
	},

	/**
	 * Create a placeholder for a particular view type
	 *
	 * @param viewType
	 * @param text
	 * @param options
	 *
	 */
	toView: function( viewType, text, options ) {
		var view = this.get( viewType ),
			encodedText = window.encodeURIComponent( text ),
			instance, viewOptions;

		if ( ! view ) {
			return text;
		}

		if ( ! this.getInstance( encodedText ) ) {
			viewOptions = options;
			viewOptions.type = viewType;
			viewOptions.encodedText = encodedText;
			instance = new view.View( viewOptions );
			instances[ encodedText ] = instance;
		}

		return '<div class="wpview-wrap" data-wpview-text="' + encodedText + '" data-wpview-type="' + viewType + '">\u00a0</div>';
	},

	/**
	 * Refresh views after an update is made
	 *
	 * @param view {object} being refreshed
	 * @param text {string} textual representation of the view
	 * @param force {Boolean} whether to force rendering
	 */
	refreshView: function( view, text, force ) {
		var encodedText = window.encodeURIComponent( text ),
			viewOptions,
			result, instance;

		instance = this.getInstance( encodedText );

		if ( ! instance ) {
			result = view.toView( text );
			viewOptions = result.options;
			viewOptions.type = view.type;
			viewOptions.encodedText = encodedText;
			instance = new view.View( viewOptions );
			instances[ encodedText ] = instance;
		}

		instance.render( force );
	},

	getInstance: function( encodedText ) {
		return instances[ encodedText ];
	},

	/**
	 * Renders any view instances inside a DOM node `scope`.
	 *
	 * View instances are detected by the presence of wrapper elements.
	 * To generate wrapper elements, pass your content through
	 * `toViews( content )`.
	 */
	render: function( force ) {
		_.each( instances, function( instance ) {
			instance.render( force );
		} );
	},

	edit: function( node ) {
		var view = this.get( $( node ).data( 'wpview-type' ) );

		if ( view ) {
			view.edit( node );
		}
	}
};
