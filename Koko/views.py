#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import requests
from json import loads
from hashlib import md5
from urllib import urlretrieve
from shutil import rmtree

from flask import jsonify, request, render_template, Response
from base import app, cache, config

@app.route('/', methods = ['GET'])
@app.route('/koko', methods = ['GET'])
def start():
	''' Returns a landing page. '''

	return render_template('start.html')

@app.route('/koko/lltk/<path:query>')
@cache.cached(timeout = 3600, key_prefix = lambda: md5(repr(request)).hexdigest(), unless = lambda: bool(request.args.has_key('caching') and request.args['caching'].lower() == 'false'))
def lltk(query):
	''' Wrappers the LLTK-RESTful interface. '''

	parameters = '?' + '&'.join([element[0] + '=' + element[1] for element in request.args.to_dict().items()])
	uri = 'http://%s:%d%s/%s%s' % (config['lltk-host'], config['lltk-port'], config['lltk-prefix'], query, parameters)
	response = requests.get(uri)
	return Response(response.text, status = response.status_code, content_type = response.headers['content-type'],)

@app.route('/koko/create')
def create():
	''' Returns a page to select language, pos and input words. '''

	return render_template('create.html')

@app.route('/koko/build/<string:session>', methods = ['POST'])
def build(session):
	''' Returns the card slider. '''

	if request.form.has_key('data'):
		data = loads(request.form['data'])

	data['session'] = session
	data['words'] = [word.strip() for word in data['words']]
	data['wordsjs'] = '["' + '", "'.join(data['words']) + '"]'

	if data['pos'].lower() == 'nn':
		return render_template('build-nn.html', data = data)

	elif data['pos'].lower() == 'vb':
		return render_template('build-vb.html', data = data)

	elif data['pos'].lower() == 'jj':
		return 'Coming soon.'
	else:
		return 'Not Found'

@app.route('/koko/audiosamples/cache/<string:session>', methods = ['GET'])
def audiosamples(session):
	''' Takes care of the caching of audiosamples. '''

	data = request.args.to_dict()
	if data.has_key('language') and data.has_key('word'):
		uri = 'http://%s:%d%s/' % (config['lltk-host'], config['lltk-port'], config['lltk-prefix'])
		uri +=  'audiosamples/' + data['language'] + '/' + data['word']
		if data.has_key('key'):
			uri += '?key=' + data['key']
		response = requests.get(uri)

	cachedresult = []
	responsedata = loads(response.text)
	if responsedata.has_key('result'):
		for element in responsedata['result']:
			directory = 'static/downloads/%s/cache/' % (session,)
			if not os.path.exists(directory):
				os.makedirs(directory)
			path = directory + md5(element).hexdigest()
			urlretrieve(element, path)
			cachedresult.append('/' + path)
	else:
		# Something went wrong on the server side.
		return jsonify(responsedata)
	data['result'] = cachedresult

	return jsonify(data)


@app.route('/koko/download/zip/<string:session>', methods = ['POST'])
def download(session):
	''' Returns the exported cards as a zip package. '''

	if request.form.has_key('cards'):
		cards = loads(request.form['cards'])

	from koko import generate_zip_package

	directory = config['directory-downloads'] + session
	path = generate_zip_package(directory, session, cards)

	rmtree(directory)

	response = Response(open(path, 'r').read(), mimetype='application/zip')
	response.headers['Content-Disposition'] = 'attachment; filename=%s' % (os.path.basename(path))
	return response
