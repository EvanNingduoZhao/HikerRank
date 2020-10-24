from django.db import models


class Text(models.Model):
    input_text = models.CharField(max_length=100)
