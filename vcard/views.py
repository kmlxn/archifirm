from django.shortcuts import render


def get_index_page(request):
    return render(request, "vcard/index.html")

def get_contacts(request):
    pass
def get_projects(request):
    pass
def get_info(request):
    pass
