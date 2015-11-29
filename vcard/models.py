from django.db import models



class Project(models.Model):
    caption = models.CharField(max_length=255)
    picture = models.ImageField(upload_to='projects')
