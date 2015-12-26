from django.db import models
from django.core.validators import validate_slug
from django.core.urlresolvers import reverse_lazy
from easy_thumbnails.fields import ThumbnailerImageField


class Project(models.Model):
    caption = models.CharField(max_length=255)
    picture = ThumbnailerImageField(upload_to='projects')
    tech_name = models.CharField(max_length=255, validators=[validate_slug],
        unique=True, help_text="Only latin letters, digits, underscores, hyphens.")
    description = models.TextField(null=True)

    def get_absolute_url(self):
        return reverse_lazy('vcard:project_page', kwargs={'project_tech_name': self.tech_name})

    def __str__(self):
        return self.caption
