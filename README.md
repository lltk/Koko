Koko
=======

Koko is a web application that uses the [Language Learning Toolkit](http://github.com/lltk/lltk) (LLTK) as a backend to allow for automatic generation of flashcards for [Anki](http://ankisrs.net/) SRS. It is based on [Flask](http://flask.pocoo.org/) and queries [LLTK-RESTful](http://github.com/lltk/lltk-restful).

The name is inspired by [Koko](http://en.wikipedia.org/wiki/Koko_(gorilla)) the gorilla who learned to communicate using American Sign
Language. Furthermore, Koko is able to understand roughly 2000 words of spoken English.

Features
------------

<img src="https://raw.githubusercontent.com/lltk/Koko/master/info/screenshot-01.png" />

Installation
------------

The current release is intended for developers only. You will have to do the following steps manually:

1. Download Koko and [LLTK-RESTful](http://github.com/lltk/lltk-restful) from GitHub and unpack packages.
2. Install requirements inside virtual environment.
3. Copy everything inside `addons/` to your Anki addon directory (`$HOME/Anki/addons/`).
4. Configure `config['host']` and `config['port']` in `config.py` (for both).
5. Get your [Forvo API](http://api.forvo.com/) key and add it to `forvokey` in `koko.js`.
6. Run `python base.py` inside virtual environment (for both).
7. Open `http://server:port/koko` in your browser. Koko is waiting for you.

Requirements
------------

Please install the following Python packages: [Flask](https://pypi.python.org/pypi/Flask), [Flask-Cache](http://pypi.python.org/pypi/Flask-Cache/0.13.1), [tornado](http://pypi.python.org/pypi/tornado). You can do that by running:

`sudo pip install -r requirements/base.txt`

Additionally you will have to have an instance of [LLTK-RESTful](http://github.com/lltk/lltk-restful) running.

License
-------

**GNU Affero General Public License (AGPL)**, see `LICENSE.txt` for further details.
