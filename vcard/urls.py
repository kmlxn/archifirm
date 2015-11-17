from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.get_index_page, name='index_page'),
    url(r'^contacts/?$', views.get_contacts, name='get_contacts'),
    url(r'^projects/?$', views.get_projects, name='get_projects'),
    url(r'^info/?$', views.get_info, name='get_info'),
]
