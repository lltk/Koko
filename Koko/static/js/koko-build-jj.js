/* Loads all the data for a card by querying LLTK's RESTful interface. */
function load(word) {

	startLoading(word);

	if (! cards.hasOwnProperty(word)) {
		cards[word] = {'audiosamples' : [], 'images' : {}, 'textsamples' : []};
	}

	async.parallel({

		'audiosamples' : function(done) { lltk('/koko/audiosamples/cache/' + session + '?language=' + language + '&word=' + word + '&key=' + forvokey, function(data) {
			cards[word]['audiosamples'] = data.result;
			done(data.error, data.results);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'images-lineart' : function(done) { lltk('/koko/lltk/' + 'images/' + language + '/' + word + '?&itype=lineart', function(data) {
			cards[word]['images']['lineart'] = data.result;
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'images-clipart' : function(done) { lltk('/koko/lltk/' + 'images/' + language + '/' + word + '?&itype=clipart', function(data) {
			cards[word]['images']['clipart'] = data.result;
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'images-photo' : function(done) { lltk('/koko/lltk/' + 'images/' + language + '/' + word + '?&itype=photo', function(data) {
			cards[word]['images']['photo'] = data.result;
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'textsamples' : function(done) { lltk('/koko/lltk/' + 'textsamples/' + language + '/' + word, function(data) {
			cards[word]['textsamples'] = data.result;
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'comparative' : function(done) { lltk('/koko/lltk/' + 'comparative/' + language + '/' + word, function(data) {
			cards[word]['comparative'] = data.result;
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'superlative' : function(done) { lltk('/koko/lltk/' + 'superlative/' + language + '/' + word, function(data) {
			cards[word]['superlative'] = data.result;
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'translation' : function(done) { lltk('/koko/lltk/translate/' + language + '/' + translation_language + '/' + word, function(data) {
			cards[word]['translation'] = data.result[0];
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'ipa' : function(done) { lltk('/koko/lltk/' + 'ipa/' + language + '/' + word, function(data) {
			cards[word]['ipa'] = data.result[0];
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); }

	}, function (error, results) {

		if (error) {
			console.log(error);
			setTimeout(function() { doneLoading(word); }, 10000);
		}
		else {
			doneLoading(word);
		}
	});

	cards[word]['lemma'] = word;

};

/* Displays the data loaded. */
/* Note that show() will be called as a callback when everything has been loaded. */
function show(word) {

	updateImage();
	if (cards[word]['audiosamples']) {
		playAudiosample(word);
	}
	updateTextsample();
	$('span#comparative').html(cards[word]['comparative'][0]);
	$('span#superlative').html(cards[word]['superlative'][0]);
	$('span#lemma').html(word);
	$('span#translation').html(cards[word]['translation']);
	$('span#ipa').html(cards[word]['ipa']);

};

/* Gets called when the OKAY button is clicked. */
function ok() {

	cards[getCurrentWord()]['language'] = language;
	cards[getCurrentWord()]['translation_language'] = translation_language;
	cards[getCurrentWord()]['pos'] = pos;
	cards[getCurrentWord()]['comparative'] = cards[getCurrentWord()]['comparative'][0];
	cards[getCurrentWord()]['superlative'] = cards[getCurrentWord()]['superlative'][0];
	if (cards[getCurrentWord()]['images'][itype]) cards[getCurrentWord()]['image'] = cards[getCurrentWord()]['images'][itype][0];
	else cards[getCurrentWord()]['image'] = '';
	if (cards[getCurrentWord()]['textsamples']) cards[getCurrentWord()]['textsample'] = cards[getCurrentWord()]['textsamples'][0];
	else cards[getCurrentWord()]['textsample'] = '';
	if (cards[getCurrentWord()]['audiosamples']) cards[getCurrentWord()]['audiosample'] = cards[getCurrentWord()]['audiosamples'][0];
	else cards[getCurrentWord()]['audiosample'] = '';
	words.remove(words.indexOf(getCurrentWord()));

	if (words.length > 0) update();
	else { showDownload(); }

};

/* Clears the current card. */
function clear() {

	content = '...'
	$('img#preview').attr({'src' : '/static/images/void.jpg', 'class' : ''});
	$('span#comparative').html(content);
	$('span#superlative').html(content);
	$('span#lemma').html(content);
	$('span#translation').html(content);
	$('span#ipa').html(content);
	$('span#textsample').html('»' + content + '«');

};
