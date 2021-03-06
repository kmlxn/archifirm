# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-26 04:44
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models
import re


class Migration(migrations.Migration):

    dependencies = [
        ('vcard', '0002_auto_20151225_1647'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='tech_name',
            field=models.CharField(help_text='Only latin letters, digits, underscores, hyphens.', max_length=255, unique=True, validators=[django.core.validators.RegexValidator(re.compile('^[-a-zA-Z0-9_]+\\Z', 32), "Enter a valid 'slug' consisting of letters, numbers, underscores or hyphens.", 'invalid')]),
        ),
    ]
