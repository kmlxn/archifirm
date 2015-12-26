from django.shortcuts import render
from .models import Project
from django.core.urlresolvers import reverse


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
    })


def get_project_page(request, project_tech_name):
    return render(request, 'vcard/project.html', {
        'project': Project.objects.get(tech_name=project_tech_name),
        'urls': _get_urls(),
    })
