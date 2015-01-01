var React = require( 'react' );
var el = React.createElement;
var _ = require( 'underscore' );
var cx = require( '../../utils/cx' );
var l10n = require( '../../utils/l10n' );
var loader = require( '../../utils/loader' );

require( './theme' );

module.exports = React.createClass( {
	getDefaultProps: function() {
		return {
			inline: true,
			menubar: false
		};
	},
	shouldComponentUpdate: function( nextProps ) {
		if ( this.editor ) {
			this.editor.startContent = nextProps.content;
			this.editor.setContent( nextProps.content, {
				format: 'raw'
			} );
			this.editor.isNotDirty = true;
			this.editor.selection.lastFocusBookmark = null;
			this.editor.undoManager.clear();
			this.editor.undoManager.add();
			this.editor.nodeChanged();
		}

		return false;
	},
	componentDidMount: function() {
		var self = this;

		loader.start();

		window.tinymce.init( _.extend( {}, this.props, {
			target: self.props.target || this.refs.editor.getDOMNode(),
			setup: function( editor ) {
				self.editor = editor;

				editor.editorManager.i18n.translate = function( text ) {
					return l10n.__( text );
				};

				if ( self.props.content ) {
					editor.on( 'preinit', function() {
						editor.setContent( self.props.content, {
							format: 'raw'
						} );
					} );
				}

				if ( editor.getElement().nodeName === 'SPAN' ) {
					editor.on( 'keydown', function( event ) {
						if ( event.keyCode === 13 ) {
							event.preventDefault();
						}
					} );
				}

				if ( editor.settings.unp ) {
					editor.on( 'beforesetcontent', function( event ) {
						if ( event.content ) {
							event.content = window.switchEditors.wpautop( event.content );
						}
					} );

					editor.on( 'savecontent', function( event ) {
						if ( event.content ) {
							event.content = window.switchEditors.pre_wpautop( event.content );
						}
					} );
				}

				// if ( editor.settings.entity_encoding === 'raw' ) {
				// 	editor.on( 'beforesetcontent', function( event ) {
				// 		if ( event.content ) {
				// 			event.content = event.content.replace( /&/g, '&amp;' );
				// 			event.content = event.content.replace( /</g, '&lt;' );
				// 			event.content = event.content.replace( />/g, '&gt;' );
				// 			event.content = event.content.replace( /"/g, '&quot;' );
				// 		}
				// 	} );

				// 	editor.on( 'getcontent', function( event ) {
				// 		if ( event.content ) {
				// 			event.content = event.content.replace( /&amp;/g, '&' );
				// 			event.content = event.content.replace( /&lt;/g, '<' );
				// 			event.content = event.content.replace( /&gt;/g, '>' );
				// 			event.content = event.content.replace( /&quot;/g, '"' );
				// 		}
				// 	} );
				// }

				editor.once( 'init', loader.stop );

				if ( self.props.setup ) {
					self.props.setup( editor );
				}
			}
		} ) );
	},
	componentWillUnmount: function() {
		if ( this.editor ) {
			this.editor.remove();
			this.editor = null;
		}
	},
	render: function() {
		return (
			el( this.props.nodeName || 'div', {
				className: cx( [ this.props.className, 'editor' ]),
				ref: 'editor',
				id: this.props.name
			} )
		);
	}
} );
