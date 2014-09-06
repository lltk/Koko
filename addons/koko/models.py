#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os

DIR_ADDONS = os.getenv('HOME') + '/Anki/addons'
DIR_TEMPLATES = 'koko/templates'

models = []

def addKokoNounModel(col):
	mm = col.models
	m = mm.new('Koko Languages (NN)')

	fm = mm.newField(_('lemma'))
	mm.addField(m, fm)
	fm = mm.newField(_('language'))
	mm.addField(m, fm)
	fm = mm.newField(_('pos'))
	mm.addField(m, fm)
	fm = mm.newField(_('article_sg'))
	mm.addField(m, fm)
	fm = mm.newField(_('article_pl'))
	mm.addField(m, fm)
	fm = mm.newField(_('plural'))
	mm.addField(m, fm)
	fm = mm.newField(_('translation'))
	mm.addField(m, fm)
	fm = mm.newField(_('ipa'))
	mm.addField(m, fm)
	fm = mm.newField(_('gender'))
	mm.addField(m, fm)
	fm = mm.newField(_('textsample'))
	mm.addField(m, fm)
	fm = mm.newField(_('image'))
	mm.addField(m, fm)
	fm = mm.newField(_('audio'))
	mm.addField(m, fm)

	m['css-path'] = DIR_ADDONS + '/koko/templates/anki.css'
	m['css'] = open(m['css-path'], 'r').read().decode('utf-8')


	t = mm.newTemplate(_('Default'))
	t['q-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/nn/default-front.html'
	t['a-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/nn/default-back.html'
	t['qfmt'] = open(t['q-path'], 'r').read().decode('utf-8')
	t['afmt'] = open(t['a-path'], 'r').read().decode('utf-8')
	mm.addTemplate(m, t)

	t = mm.newTemplate(_('Recognition'))
	t['q-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/nn/recognition-front.html'
	t['a-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/nn/recognition-back.html'
	t['qfmt'] = open(t['q-path'], 'r').read().decode('utf-8')
	t['afmt'] = open(t['a-path'], 'r').read().decode('utf-8')
	mm.addTemplate(m, t)

	mm.add(m)
	return m

models.append(('Koko Languages (NN)', addKokoNounModel))

def addKokoVerbModel(col):
	mm = col.models
	m = mm.new('Koko Languages (VB)')

	fm = mm.newField(_('lemma'))
	mm.addField(m, fm)
	fm = mm.newField(_('language'))
	mm.addField(m, fm)
	fm = mm.newField(_('pos'))
	mm.addField(m, fm)
	fm = mm.newField(_('present'))
	mm.addField(m, fm)
	fm = mm.newField(_('past'))
	mm.addField(m, fm)
	fm = mm.newField(_('perfect'))
	mm.addField(m, fm)
	fm = mm.newField(_('future'))
	mm.addField(m, fm)
	fm = mm.newField(_('translation'))
	mm.addField(m, fm)
	fm = mm.newField(_('ipa'))
	mm.addField(m, fm)
	fm = mm.newField(_('textsample'))
	mm.addField(m, fm)
	fm = mm.newField(_('image'))
	mm.addField(m, fm)
	fm = mm.newField(_('audio'))
	mm.addField(m, fm)

	m['css-path'] = DIR_ADDONS + '/koko/templates/anki.css'
	m['css'] = open(m['css-path'], 'r').read().decode('utf-8')

	t = mm.newTemplate(_('Default'))
	t['q-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/vb/default-front.html'
	t['a-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/vb/default-back.html'
	t['qfmt'] = open(t['q-path'], 'r').read().decode('utf-8')
	t['afmt'] = open(t['a-path'], 'r').read().decode('utf-8')
	mm.addTemplate(m, t)

	t = mm.newTemplate(_('Recognition'))
	t['q-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/vb/recognition-front.html'
	t['a-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/vb/recognition-back.html'
	t['qfmt'] = open(t['q-path'], 'r').read().decode('utf-8')
	t['afmt'] = open(t['a-path'], 'r').read().decode('utf-8')
	mm.addTemplate(m, t)

	mm.add(m)
	return m

models.append(('Koko Languages (VB)', addKokoVerbModel))

def addKokoAdjectiveModel(col):
	mm = col.models
	m = mm.new('Koko Languages (JJ)')

	fm = mm.newField(_('lemma'))
	mm.addField(m, fm)
	fm = mm.newField(_('language'))
	mm.addField(m, fm)
	fm = mm.newField(_('pos'))
	mm.addField(m, fm)
	fm = mm.newField(_('comparative'))
	mm.addField(m, fm)
	fm = mm.newField(_('superlative'))
	mm.addField(m, fm)
	fm = mm.newField(_('translation'))
	mm.addField(m, fm)
	fm = mm.newField(_('ipa'))
	mm.addField(m, fm)
	fm = mm.newField(_('textsample'))
	mm.addField(m, fm)
	fm = mm.newField(_('image'))
	mm.addField(m, fm)
	fm = mm.newField(_('audio'))
	mm.addField(m, fm)

	m['css-path'] = DIR_ADDONS + '/koko/templates/anki.css'
	m['css'] = open(m['css-path'], 'r').read().decode('utf-8')

	t = mm.newTemplate(_('Default'))
	t['q-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/jj/default-front.html'
	t['a-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/jj/default-back.html'
	t['qfmt'] = open(t['q-path'], 'r').read().decode('utf-8')
	t['afmt'] = open(t['a-path'], 'r').read().decode('utf-8')
	mm.addTemplate(m, t)

	t = mm.newTemplate(_('Recognition'))
	t['q-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/jj/recognition-front.html'
	t['a-path'] = DIR_ADDONS + '/' + DIR_TEMPLATES + '/jj/recognition-back.html'
	t['qfmt'] = open(t['q-path'], 'r').read().decode('utf-8')
	t['afmt'] = open(t['a-path'], 'r').read().decode('utf-8')
	mm.addTemplate(m, t)

	mm.add(m)
	return m

models.append(('Koko Languages (JJ)', addKokoAdjectiveModel))
