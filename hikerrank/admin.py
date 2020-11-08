from django.contrib import admin
from .models import Text,Profile_Picture,Profile,Trail,Event,Photo,CheckIn,Review,Follow_UnFollow
# Register your models here.
admin.site.register(Text)
admin.site.register(Profile)
admin.site.register(Profile_Picture)
admin.site.register(Trail)
admin.site.register(Event)
admin.site.register(Photo)
admin.site.register(CheckIn)
admin.site.register(Review)
admin.site.register(Follow_UnFollow)
