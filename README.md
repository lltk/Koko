Koko
=======

Koko is a web application that uses the [Language Learning Toolkit](http://github.com/lltk/lltk) (LLTK) as a backend to allow for automatic generation of flashcards for [Anki](http://ankisrs.net/) SRS. It is based on [Flask](http://flask.pocoo.org/) and queries [LLTK-RESTful](http://github.com/lltk/lltk-restful). The name is inspired by [Koko](http://en.wikipedia.org/wiki/Koko_(gorilla)) the gorilla.

<img src="https://raw.githubusercontent.com/lltk/Koko/master/info/screenshot-01.png" />

Installation
------------

The current release is intended for developers only.

1. Download Koko and [LLTK-RESTful](http://github.com/lltk/lltk-restful) from GitHub and unpack packages.
2. Install requirements inside virtual environment.
3. Configure `config['host']` and `config['port']` in `config.py` (for both).
4. Run `python base.py` inside virtual environment.
5. Open `http://server:port/koko` in your browser. Koko is waiting for you.

Requirements
------------

Please install the following Python packages: [Flask](https://pypi.python.org/pypi/Flask), [Flask-Cache](http://pypi.python.org/pypi/Flask-Cache/0.13.1), [tornado](http://pypi.python.org/pypi/tornado). You can do that by running:

`sudo pip install -r requirements/base.txt`

Additionally you will have to have an instance of [LLTK-RESTful](http://github.com/lltk/lltk-restful) running.

License
-------

**GNU Affero General Public License (AGPL)**, see `LICENSE.txt` for further details.
