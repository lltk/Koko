#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
from zipfile import ZipFile
from urllib import urlretrieve

from base import config

def generate_csv(path, cards):
	''' . '''

	csvfile = open(path, 'w')
	delimiter = config['csv-delimiter']

	for lemma, card in cards.iteritems():

		if card['pos'].lower() == 'nn':

			schema = ('lemma', 'article_sg', 'article_pl', 'plural', 'translation', 'ipa', 'gender', 'textsample', 'imagepath', 'audiopath')

			for key in schema:
				if not card.has_key(key):
					card[key] = '-'

			imagefield = '<img src="%s">' % (card['imagepath'],)
			audiofield = '[sound:%s]' % (card['audiopath'],)

			line = (card['lemma'], card['language'], card['pos'], card['article_sg'], card['article_pl'], card['plural'], card['translation'], card['ipa'], card['gender'], card['textsample'], imagefield, audiofield)

		elif card['pos'].lower() == 'vb':

			schema = ('lemma', 'present', 'past', 'perfect', 'future', 'translation', 'ipa', 'gender', 'textsample', 'imagepath', 'audiopath')

			for key in schema:
				if not card.has_key(key):
					card[key] = '-'

			imagefield = '<img src="%s">' % (card['imagepath'],)
			audiofield = '[sound:%s]' % (card['audiopath'],)

			line = (card['lemma'], card['language'], card['pos'], card['present'], card['past'], card['perfect'], card['future'], card['translation'], card['ipa'], card['textsample'], imagefield, audiofield)

		elif card['pos'].lower() == 'jj':

			schema = ('lemma', 'comparative', 'superlative', 'translation', 'ipa', 'gender', 'textsample', 'imagepath', 'audiopath')

			for key in schema:
				if not card.has_key(key):
					card[key] = '-'

			imagefield = '<img src="%s">' % (card['imagepath'],)
			audiofield = '[sound:%s]' % (card['audiopath'],)

			line = (card['lemma'], card['language'], card['pos'], card['comparative'], card['superlative'], card['translation'], card['ipa'], card['textsample'], imagefield, audiofield)

		else:
			line = ('',)

		# This will replace all None with u''
		line = [element or u'' for element in line]
		csvfile.write((delimiter.join(line) + '\n').encode('utf-8'))

	csvfile.close()

	return path

def generate_zip_package(directory, session, cards):

	if not os.path.exists(directory):
		os.makedirs(directory)

	for lemma, card in cards.iteritems():

		if card.has_key('image'):
			imagepath = directory + ('/%s-%s-%s.%s' % (card['language'], card['pos'], card['lemma'], card['image'].split('.')[-1]))
			card['imagepath'] = os.path.basename(imagepath)
			urlretrieve(card['image'], imagepath)
		if card.has_key('audiosample'):
			print card['audiosample']
			audiopath = directory + ('/%s-%s-%s.%s' % (card['language'], card['pos'], card['lemma'], 'mp3'))
			card['audiopath'] = os.path.basename(audiopath)
			if os.path.exists(card['audiosample'][1:]):
				os.rename(card['audiosample'][1:], audiopath)
			else:
				print 'Audiosample ' + audiopath + ' for "' + card['lemma'] +'" not found.'

	csvpath = directory + '/%s.csv' % (session,)
	generate_csv(csvpath, cards)

	files = os.listdir(directory)
	if 'cache' in files:
		files.remove('cache')
	zippath = 'static/downloads/%s.zip' % (session,)
	zipfile = ZipFile(zippath, 'w')

	for f in files:
		zipfile.write(directory + '/' + f, f)
	zipfile.close()

	return zippath
