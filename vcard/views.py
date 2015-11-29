from django.shortcuts import render
from .models import Project


def get_index_page(request):
    return render(request, 'vcard/index.html', {
        'projects': Project.objects.all(),
    })
