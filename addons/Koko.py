#!/usr/bin/env python
# -*- mode: Python ; coding: utf-8 -*-

# Author: Markus Beuckelmann <email@markus-beuckelmann.de>
# License: GNU AGPL – http://www.gnu.org/licenses/agpl-3.0.html

''' This addon adds additional note types intended to be used with Koko. '''

__version__ = '0.1.0'

import aqt

from aqt import mw
from aqt.qt import *
from anki.hooks import wrap

from koko.models import models

def addKokoNoteTypes():

	m = mw.col.models
	existing = m.allNames()

	for name, f in models:
		if name in existing:
			model = m.byName(name)
			model['css'] = open(model['css-path'], 'r').read().decode('utf-8')
			for template in model['tmpls']:
				template['qfmt'] = open(template['q-path'], 'r').read().decode('utf-8')
				template['afmt'] = open(template['a-path'], 'r').read().decode('utf-8')
		else:
			model = f(mw.col)
		m.update(model)

def load(self):

	addKokoNoteTypes()
aqt.main.AnkiQt.loadProfile = wrap(aqt.main.AnkiQt.loadProfile, load)
