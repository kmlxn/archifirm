from django.contrib import admin

from .models import Project



class ProjectAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,
            {'fields':
                ['caption', 'picture', 'tech_name', 'description']
            }
        )
    ]
    list_display = ('caption',)



admin.site.register(Project, ProjectAdmin)
