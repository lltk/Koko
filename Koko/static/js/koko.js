var sound = true;
var itype = 'lineart';
var forvokey = '';
var number_of_preloads = 3;

/* Array Remove - By John Resig (MIT Licensed) */
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

Array.prototype.rotate = function(n) {

	this.unshift.apply(this, this.splice(n, this.length))
	return this;

};

/* From https://gist.github.com/DavidMah/3533415#file-filedownloader-js */
jQuery.download = function(url, key, data){

	var form = $('<form></form>').attr('action', url).attr('method', 'post');
	form.append($("<input></input>").attr('type', 'hidden').attr('name', key).attr('value', data));
	form.appendTo('body').submit().remove();

};

function zfill(string, n) { return(1e15 + string + '').slice(-n) }

/* Uses AJAX to get data from the LLTK-RESTful backend. */
function lltk(query, callback) {

	if (query) {
		console.log('LLTK-RESTful: ' + query);
		return $.getJSON(query, callback);
	}

};

/* Inserts an array of images into the DOM. The browser will start to preload the images. */
function preloadImages(arrayOfImages) {

	if (arrayOfImages) {
		$(arrayOfImages).each(function () {
			datadiv = $('div#data')
			$('<img />').attr('src', this).appendTo(datadiv).css('display','none');
		});
	}

};

/* Generates a session id. */
function generateSessionId() {

	var date = new Date();
	return 'Koko-' + zfill(date.getHours(), 2) + ':' + zfill(date.getMinutes(), 2) + ':' + zfill(date.getSeconds(), 2);

};
