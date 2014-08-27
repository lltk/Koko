var cards = {};
var iseverythingloaded = false;

$(document).ready(function() { init(); });

function init() {

	firstword = words[0];
	lastword = words[words.length - 1];
	update(getCurrentWord());

};

/* Returns the current word. */
function getCurrentWord() {
	return words[0];
};

/* Return next word relative to word specified. */
function getNextWord(word) { return words[(words.indexOf(word) + 1) % (words.length)] };

/* Returns the amount of cards between current word and specified word. */
function getDistanceToCurrentWord(word) { return words.indexOf(word) - words.indexOf(getCurrentWord()); };

/* function getNextWord() { return words[(words.indexOf(word) + 1) % (words.length)] }; */
/* function getPreviousWord() { }; */

/* Moves on to the next card. */
function next() {

	words.rotate(1);
	update();

};

/* Goes back to the last card. */
function previous() {

	words.rotate(-1);
	update();

};

/* Updates the current card. */
function update() {

	clear();

	if (! cards.hasOwnProperty(getCurrentWord())) load(getCurrentWord());
	else {
		console.log('"' + getCurrentWord() + '" already loaded.');
		show(getCurrentWord());
		preheat();
	}

	/* Note that show() will be called as a callback when everything has been loaded. */

	$('title').html('Koko: ' + getCurrentWord() + ' (' + language + ')');
	$('.editable').editable(function(value, settings) { $('#' + this.id).html(value); }, {onblur : 'submit', 'placeholder' : '...'});

};

/* Deletes the current card */
function deleteCard() {

	delete cards[getCurrentWord()];
	words.shift();

};

/* Moves on to the next preview image of the current card. */
function nextImage() {

	cards[getCurrentWord()]['images'][itype].rotate(1);
	updateImage();

};

/* Updates the current preview image of the current card. */
function updateImage() {

	total =  countImages(getCurrentWord());
	if (total == 0) $('img#preview').attr({'src' : '/static/images/no-image.jpg', 'title' : 'No image found', 'alt' : 'No image found'});
	else {
		if (cards[getCurrentWord()]['images'][itype].length == 0) toggleImages();
		else $('img#preview').attr({'src' : cards[getCurrentWord()]['images'][itype][0], 'title' : getCurrentWord() + ' (' + itype + ')', 'alt' : getCurrentWord() + ' (' + itype + ')', 'class' : 'shake'});
	}
};

function countImages(word) {

	total = 0;
	if (cards[getCurrentWord()]['images'].hasOwnProperty('lineart')) total += cards[getCurrentWord()]['images']['lineart'].length;
	if (cards[getCurrentWord()]['images'].hasOwnProperty('clipart')) total += cards[getCurrentWord()]['images']['clipart'].length;
	if (cards[getCurrentWord()]['images'].hasOwnProperty('photo')) total += cards[getCurrentWord()]['images']['photo'].length;
	return total;

}

/* Bypasses the cache to reload the preview images. */
function reloadImages(word) {

	startLoading(word);
	console.log('Reloading images for "' + word + '"...');

	async.parallel({

		'images-lineart' : function(done) { lltk('/koko/lltk/' + 'images/' + language + '/' + word + '?&caching=false&itype=lineart', function(data) {
			cards[word]['images']['lineart'] = data.result;
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'images-clipart' : function(done) { lltk('/koko/lltk/' + 'images/' + language + '/' + word + '?&caching=false&itype=clipart', function(data) {
			cards[word]['images']['clipart'] = data.result;
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); },

		'images-photo' : function(done) { lltk('/koko/lltk/' + 'images/' + language + '/' + word + '?&caching=false&itype=photo', function(data) {
			cards[word]['images']['photo'] = data.result;
			done(data.error, data.result);
		}).error(function(jqXHR, status, error) { done(jqXHR.responseJSON, false); }); }

	}, function (error, results) {

		if (error) {
			console.log(error);
			setTimeout(function() { doneLoading(word); }, 10000);
		}
		else {
			doneLoading(word);
			updateImage();
		}
	});

};

/* Moves on to the next audiosample of the current card. */
function nextAudiosample() {

	cards[getCurrentWord()]['audiosamples'].rotate(1);
	if (cards[getCurrentWord()]['audiosamples']) playAudiosample();

};

/* Plays the current audiosample of the current card. */
function playAudiosample() {

	if (sound) {

		var audioElement = $('div#data').find('audio[src$="' + cards[getCurrentWord()]['audiosamples'][0] + '"]')[0];
		if (audioElement) {
			/* We have to reload the audio to play it more that once. */
			audioElement.load();
			audioElement.play();
		}
	}

};

function createAudiosamples(arrayOfAudiosamples) {

	if (arrayOfAudiosamples) {
		datadiv = $('div#data')
		$(arrayOfAudiosamples).each(function () {
			var audioElement = document.createElement('audio');
			audioElement.setAttribute('src', this);
			audioElement.setAttribute('preload', 'auto');
			//audioElement.setAttribute('onerror', 'nextAudiosample();');
			$(audioElement).appendTo(datadiv).css('display','none');
		});
	}

};

/* Moves on to the next textsample of the current card. */
function nextTextsample() {

	cards[getCurrentWord()]['textsamples'].rotate(1);
	updateTextsample();

};

/* Updates the current textsample of the current card. */
function updateTextsample() { $('#textsample').html('»' + cards[getCurrentWord()]['textsamples'][0] + '«'); };

/* Gets called when the DOWNLOAD button is clicked. */
function download() {

	json = JSON.stringify(cards);
	$.download('/koko/download/zip/' + session, 'cards', json);
	button = $('span#button');
	button.html('Done');
	button.attr({'class' : 'button blue bigrounded', 'type' : 'done'});

};

/* Switches to the download mode. Should be called when there are no more cards. */
function showDownload() {

	hideArrows()
	button = $('span#button');
	if (Object.keys(cards).length) {
		button.html('Download');
		button.attr({'class' : 'button orange bigrounded', 'type' : 'download'});
	}
	else {
		/* There are no cards to download. */
		button.html('There are no cards to download');
		button.attr({'class' : 'button orange bigrounded'});
	}
};

/* Preheats the cache by requesting (AJAX) the next cards. */
/* When preheat gets called, it assures that the next number_of_preload cards are preloaded. */
function preheat() {

	for (var i = 1; i <= number_of_preloads; i++) {
		if (nextword) var nextword = getNextWord(nextword);
		else var nextword = getNextWord(getCurrentWord());

		if (getDistanceToCurrentWord(nextword) >= number_of_preloads) break;
		if (! cards.hasOwnProperty(nextword)) {
			load(nextword);
			break;
		}
	}

};

/* Turns the sound on/off. */
function toggleSound() {

	sound = ! sound;
	if (sound) {
		$('img#toggle-sound').attr({'src' : '/static/images/sound-on.png'});
	}
	else {
		$('img#toggle-sound').attr({'src' : '/static/images/sound-off.png'});
	}

};

/* Switches the preview image type. Available choices are: lineart, clipart, photo. */
function toggleImages() {

	if (itype == 'lineart') {
		itype = 'clipart';
	}
	else if (itype == 'clipart') {
		itype = 'photo';

	}
	else if (itype == 'photo') {
		itype = 'lineart';
	}
	else {
		itype = 'lineart';
	}

	updateImage(getCurrentWord());

}

/* Shows the navigations arrows (next, previous). */
function showArrows() {

	$('span#next').show();
	$('span#previous').show();

}

/* Hides the navigations arrows (next, previous). */
function hideArrows() {

	$('span#next').hide();
	$('span#previous').hide();

}

/* Callback that gets called before loading data for cards. */
function startLoading(word) {

	if (word == getCurrentWord()) {
		// $('img#loading').show();
	}
};

/* Callback that gets called when the data for one card has been loaded. */
function doneLoading(word) {

	console.log('"' + word + '" done loading.');
	if (word == lastword) iseverythingloaded = true;
	preloadImages(cards[word]['images']['lineart']);
	preloadImages(cards[word]['images']['clipart']);
	preloadImages(cards[word]['images']['photo']);
	createAudiosamples(cards[word]['audiosamples']);
	if (word == getCurrentWord()) {
		/* Only show the data if we have loaded the current card. */
		show(word);
		// $('img#loading').hide();
	}

	preheat();

};

/* Gets called when the big button is clicked. */
function buttonPressed() {

	button = $('#button');
	if (button.attr('type') == 'ok') {
		ok(getCurrentWord());
	}
	else if (button.attr('type') == 'download') {
		download();
	}

};

$(document).keydown(function(e) {

	switch(e.which) {

		/* Right key */
		case 39: next();
		break;

		/* Left key */
		case 37: previous();
		break;
	}

});
