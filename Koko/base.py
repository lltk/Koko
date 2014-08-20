#!/usr/bin/python
# -*- coding: UTF-8 -*-

__author__ = 'Markus Beuckelmann'
__author_email__ = 'email@markus-beuckelmann.de'
__version__ = '0.0.1'

DEBUG = True
HOST = '127.0.0.1'
PORT = 5002
NAME = 'Koko'

from flask import Flask

app = Flask(NAME)

if __name__ == '__main__':

	if DEBUG:

		# Run the development server if debug mode is on
		app.run(debug = True , host = HOST, port = PORT);
	else:

		try:

			from tornado.wsgi import WSGIContainer
			from tornado.httpserver import HTTPServer
			from tornado.ioloop import IOLoop
			from tornado.log import enable_pretty_logging

			enable_pretty_logging()
			http_server = HTTPServer(WSGIContainer(app))
			http_server.listen(PORT, HOST)
			IOLoop.instance().start()

		except ImportError:
			app.run(debug = False, host = HOST, port = PORT);
