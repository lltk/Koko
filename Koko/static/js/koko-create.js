/* Gets called when the START button is clicked. */
function start() {

	var textarea = $('textarea#words');
	if (textarea.val().length > 0) {
		content = textarea.val();
		/* Split at commas and newline and remove whitespace from all elements. */
		words = $.map(content.split(/[\n|,]/), $.trim);
		/* Remove empty elements */
		words = words.filter(function(element) { return element != "" });
	}
	var data = {};
	data['pos'] = $('select#pos').val();
	data['language'] = $('select#language').val();
	data['translation_language'] = $('select#translation_language').val();
	data['words'] = words;
	$.download('/koko/build/' + generateSessionId(), 'data', JSON.stringify(data));

};
