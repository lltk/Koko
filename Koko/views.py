#!/usr/bin/python
# -*- coding: UTF-8 -*-

from flask import render_template
from base import app

@app.route('/', methods = ['GET'])
@app.route('/koko', methods = ['GET'])
def start():
	''' Returns a landing page. '''

	return render_template('start.html')
