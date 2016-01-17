from django.shortcuts import render
from django.conf import settings

from constance import config as dynamic_settings

from .models import Project


def prepare_sections_conf():
    sections_conf = settings.SECTIONS_CONF

    for section in sections_conf.values():
        section['hash'] = '#' + section['anchor']
        if section['slides']:
            for slide in section['slides'].values():
                slide['hash'] = '#' + section['anchor'] + '/' + slide['anchor']

    return sections_conf


def get_index_page(request):
    return render(request, 'vcard/index.html', {
        'sections_conf': prepare_sections_conf(),
        'about_us_text': dynamic_settings.ABOUT_US_PAGE_TEXT,
        'contact_text': dynamic_settings.CONTACT_PAGE_TEXT,
        'h1_text': dynamic_settings.H1_TEXT,
        'page_title': dynamic_settings.PAGE_TITLE,
        'projects': Project.objects.all(),
    })


def get_project_details(request, project_tech_name):
    return render(request, 'vcard/project.html', {
        'project': Project.objects.get(tech_name=project_tech_name),
    })
