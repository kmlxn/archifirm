from django.shortcuts import render
from django.core.urlresolvers import reverse

from constance import config

from .models import Project


def _get_urls():
    return {
        'main': reverse('vcard:index_page') + '#hello',
        'projects': reverse('vcard:index_page') + '#we',
        'about': reverse('vcard:index_page') + '#we/about',
        'contact': reverse('vcard:index_page') + '#we/contact',
    }


def get_index_page(request):
    return render(request, 'vcard/index.html', {
        'projects': Project.objects.all(),
        'urls': _get_urls(),
        'config': config,
    })


def get_project_details(request, project_tech_name):
    return render(request, 'vcard/project.html', {
        'project': Project.objects.get(tech_name=project_tech_name),
        'urls': _get_urls(),
    })
