from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.get_index_page, name='index_page'),
    url(r'^project/(?P<project_tech_name>[-a-zA-Z0-9_]+)$', views.get_project_page, name='project_page'),
]
