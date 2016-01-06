from django.contrib import admin

from .models import Project, ProjectAdditionalPicture


class ProjectAdditionalPictureInLine(admin.TabularInline):
    model = ProjectAdditionalPicture
    extra = 3


class ProjectAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,
            {'fields':
                ['caption', 'tech_name', 'description', 'main_picture']
            }
        )
    ]
    list_display = ('caption',)
    inlines = [ProjectAdditionalPictureInLine]


admin.site.register(Project, ProjectAdmin)
