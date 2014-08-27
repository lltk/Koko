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

		'articles' : function(done) { lltk('/koko/lltk/' + 'articles/' + language + '/' + word, function(data) {
			cards[word]['articles'] = data.result;
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'translation' : function(done) { lltk('/koko/lltk/translate/' + language + '/' + translation_language + '/' + word, function(data) {
			cards[word]['translation'] = data.result[0];
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'plural' : function(done) { lltk('/koko/lltk/' + 'plural/' + language + '/' + word, function(data) {
			cards[word]['plural'] = data.result[0];
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'gender' : function(done) { lltk('/koko/lltk/' + 'gender/' + language + '/' + word, function(data) {
			cards[word]['gender'] = data.result[0];
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
	$('span#article_sg').html(cards[word]['articles'][0][0]);
	if (! cards[word]['articles'][1][0] == '') {
		/* There is a plural form */
		$('span#pl_comma').show();
		$('span#article_pl').show();
		$('span#article_pl').html(cards[word]['articles'][1][0]);
		$('span#plural').show();
		$('span#plural').html(cards[word]['plural']);
	}
	else {
		/* There is no plural form */
		$('span#pl_comma').hide();
		$('span#article_pl').hide();
		$('span#plural').hide();
	}
	$('span#lemma').html(word);
	$('span#translation').html(cards[word]['translation']);
	$('span#gender').html(cards[word]['gender']);
	$('span#gender').attr({'info' : cards[word]['gender']});
	$('span#ipa').html(cards[word]['ipa']);

};

/* Gets called when the OKAY button is clicked. */
function ok() {

	cards[getCurrentWord()]['language'] = language;
	cards[getCurrentWord()]['translation_language'] = translation_language;
	cards[getCurrentWord()]['pos'] = pos;
	cards[getCurrentWord()]['article_sg'] = cards[getCurrentWord()]['articles'][0][0];
	cards[getCurrentWord()]['article_pl'] = cards[getCurrentWord()]['articles'][1][0];
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
	$('span#article_sg').html(content);
	$('span#lemma').html(content);
	$('span#article_pl').html(content);
	$('span#plural').html(content);
	$('span#translation').html(content);
	$('span#ipa').html(content);
	$('span#gender').html(content);
	$('span#gender').attr({'info' : ''});
	$('span#textsample').html('»' + content + '«');

};
