#!/usr/bin/python
# -*- coding: UTF-8 -*-

import requests
from hashlib import md5

from flask import request, render_template, Response
from base import app, cache

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
