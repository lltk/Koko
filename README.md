Koko
=======

Koko is a web application that uses the [Language Learning Toolkit](http://github.com/lltk/lltk) (LLTK) as a backend to allow for automatic generation of flashcards for [Anki](http://ankisrs.net/) SRS. It is based on [Flask](http://flask.pocoo.org/) and queries [LLTK-RESTful](http://github.com/lltk/lltk-restful).

The name is inspired by [Koko](http://en.wikipedia.org/wiki/Koko_(gorilla)) the gorilla who learned to communicate using [American Sign
Language](http://en.wikipedia.org/wiki/American_Sign_Language) (ASL). Furthermore, Koko is able to understand roughly 2000 words of spoken English.

Features
------------

<img src="https://raw.githubusercontent.com/lltk/Koko/master/info/screenshot-01.png" />
<img src="https://raw.githubusercontent.com/lltk/Koko/master/info/screenshot-02.png" />
<img src="https://raw.githubusercontent.com/lltk/Koko/master/info/screenshot-03.png" />

Installation
------------

The current release is intended for developers only. You will have to do the following steps manually:

1. Download Koko and [LLTK-RESTful](http://github.com/lltk/lltk-restful) from GitHub and unpack packages.
2. Install requirements inside virtual environment.
3. Copy `addons/*` to your Anki addon directory (`$HOME/Anki/addons/`). Restart Anki.
4. Configure `config['host']` and `config['port']` in `config.py` (for both).
5. Get your [Forvo API](http://api.forvo.com/) key and add it to `forvokey` in `koko.js`.
6. Run `python base.py` inside virtual environment (for both).
7. Open `http://server:port/koko` in your browser. Koko is waiting for you.

Import into Anki
------------

At the end of the session, you will get a ZIP package containing all the data. If you have installed the addons correctly (see Installation), there should be three new note types: `Koko Languages (NN)`, `Koko Languages (VB)` and `Koko Languages (JJ)`.
Unzip the ZIP package, open Anki and proceed to the import dialog. Select the `.csv` file you got from Koko, choose the correct note type (`NN` for nouns, `VB` for verbs, `JJ` for adjectives), and import everything into a deck of your choice.

Requirements
------------

Please install the following Python packages: [Flask](https://pypi.python.org/pypi/Flask), [Flask-Cache](http://pypi.python.org/pypi/Flask-Cache/0.13.1), [tornado](http://pypi.python.org/pypi/tornado). You can do that by running:

`sudo pip install -r requirements/base.txt`

Additionally you will have to have an instance of [LLTK-RESTful](http://github.com/lltk/lltk-restful) running.

License
-------

**GNU Affero General Public License (AGPL)**, see `LICENSE.txt` for further details.
