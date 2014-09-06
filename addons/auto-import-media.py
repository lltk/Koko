#!/usr/bin/env python
# -*- mode: Python ; coding: utf-8 -*-

# Author: Markus Beuckelmann <email@markus-beuckelmann.de>
# License: GNU AGPL – http://www.gnu.org/licenses/agpl-3.0.html

''' This addon hooks TextImporter (CSV files) to automatically import media files within the same directory. '''

__version__ = '1.0.0'

import os
import re

from aqt import mw
from anki.hooks import wrap
from anki.importing import TextImporter
from anki.media import MediaManager

def importNotes(self, notes):

	mediamanager = MediaManager(mw.col, None)
	directory = os.path.dirname(self.file)
	files = os.listdir(directory)

	regexes = [re.compile(regex) for regex in mediamanager.regexps]

	for note in notes:
		for field in note.fields:
			for regex in regexes:
				for finding in regex.findall(field):
					mediafile = finding[-1]
					if mediafile in files:
						mediamanager.addFile(directory + '/' + mediafile)

TextImporter.importNotes = wrap(TextImporter.importNotes, importNotes)
