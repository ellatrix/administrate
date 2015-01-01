var React = require( 'react' );
var el = React.createElement;
var jQuery = require( 'jquery' );
var TinyMCE = require( './tinymce/tinymce.react' );
var PostEditStore = require( '../stores/PostEditStore' );
var PostsEditStore = require( '../stores/PostsEditStore' );
var RouterStore = require( '../stores/RouterStore' );
var l10n = require( '../utils/l10n' );
var _ = require( 'underscore' );

module.exports = React.createClass( {
	getInitialState: function() {
		return {
			post: PostEditStore
		};
	},
	componentDidMount: function() {
		PostEditStore.on( 'change', this._onChange );
	},
	componentWillUnmount: function() {
		PostEditStore.off( 'change', this._onChange );
	},
	render: function() {
		var buttons;

		if ( RouterStore.get( 'route' ) !== 'posts' && RouterStore.get( 'route' ) !== 'pages' ) {
			return null;
		}

		if ( this.state.post.get( 'status' ) === 'draft' ) {
			buttons = (
				el( 'div', { className: 'content-buttons' },
					el( 'button', { type: 'submit', className: 'button' },
						l10n.__( 'Save Draft')
					),
					el( 'button', { type: 'submit', className: 'button button-primary' },
						l10n.__( 'Publish')
					)
				)
			);
		} else {
			buttons = (
				el( 'div', { className: 'content-buttons' },
					el( 'button', { type: 'submit', className: 'button button-primary' },
						l10n.__( 'Update' )
					)
				)
			);
		}

		return (
			el( 'form', {
				className: 'content',
				method: 'post',
				action: window.location.pathname,
				onSubmit: this._onSubmit
			},
				el( 'div', { className: 'content-navigation' },
					el( 'a', {
						className: 'dashicons dashicons-admin-collapse',
						href: '#',
						onClick: this._onClickCollapse
					} ),
					buttons
				),
				el( 'div', { className: 'content-section' },
					el( 'div', { className: 'editor-toolbar' } ),
					el( 'div', { className: 'editor-area' },
						el( 'h1', null,
							el( TinyMCE , {
								className: 'title-field',
								name: 'title',
								entity_encoding: 'raw',
								nodeName: 'span',
								toolbar: false,
								paste_as_text: true,
								plugins: 'paste',
								valid_elements: 'a',
								content: this.state.post.get( 'title' ) && this.state.post.get( 'title' ).raw || '',
								setup: function( editor ) {
									editor.on( 'init', function() {
										editor.on( 'keyup setcontent', function() {
											PostsEditStore.get( PostEditStore.get( 'id' ) ).set( 'title', {
												raw: editor.getContent()
											} );
										} );
									} );
								}
							} )
						),
						el( TinyMCE, {
							className: 'content-field',
							name: 'content',
							unp: true,
							fixed_toolbar_container: '.editor-toolbar',
							content: this.state.post.get( 'content' ) ? this.state.post.get( 'content' ).raw || '' : ''
						} )
					)
				)
			)
		);
	},
	_onChange: function() {
		this.setState( { post: PostEditStore } );
	},
	_onClickCollapse: function( event ) {
		jQuery( document.body ).toggleClass( 'collapse' );
		event.preventDefault();
	},
	_onSubmit: function( event ) {
		var target = event.target;

		event.preventDefault();

		_.defer( function() {
			PostEditStore.save( {
				content: {
					raw: jQuery( target ).find( 'input[name="content"]' ).val()
				},
				title : {
					raw: jQuery( target ).find( 'input[name="title"]' ).val()
				}
			} );
		} );
	}
} );
