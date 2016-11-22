(function (tinymce, toolbar) {
  tinymce.ThemeManager.add('administrate', function (editor) {
    var inlineToolbarContainer
    var settings = editor.settings
    var Factory = tinymce.ui.Factory

    if (settings.fixed_toolbar_container) {
      inlineToolbarContainer = tinymce.DOM.select(settings.fixed_toolbar_container)[0]
    }

    editor.theme = {}

    panel = editor.theme.panel = Factory.create({
      type: 'floatpanel',
      role: 'application',
      classes: 'tinymce tinymce-inline',
      layout: 'stack',
      fixed: !!inlineToolbarContainer,
      items: [
        toolbar.createToolbars(editor, settings.toolbar_items_size)
      ]
    })

    editor.fire('BeforeRenderUI')
    panel.renderTo(inlineToolbarContainer || document.body).reflow()

    return {
      renderUI: function () {
        return {}
      },
      resizeTo: function () {},
      resizeBy: function () {}
    }
  })
})(window.tinymce, window.administrate.mce.toolbar)
