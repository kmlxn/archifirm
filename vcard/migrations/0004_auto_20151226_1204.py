# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-26 12:04
from __future__ import unicode_literals

from django.db import migrations
import easy_thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('vcard', '0003_auto_20151226_0444'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='picture',
            field=easy_thumbnails.fields.ThumbnailerImageField(upload_to='projects'),
        ),
    ]