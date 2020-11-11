from django.db import models

from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


def profile_picture_upload_path(instance, filename):
   return '/'.join([str(instance.user.username),filename])


# id link to user id
class Profile(models.Model):
   user         = models.OneToOneField(User, primary_key=True,default=None, on_delete=models.PROTECT)
   bio 		    = models.TextField(default="Tell me about yourself...",blank=True)
   picture      = models.FileField(default="default-picture.png",max_length=255,upload_to=profile_picture_upload_path)


class Trail(models.Model):
#    Id  =models.PositiveIntegerField(primary_key=True)
   name      = models.CharField(max_length=100)
   summary     = models.TextField(blank=True)
   difficulty = models.CharField(max_length=50)
   location     = models.CharField(max_length=100)
   longitude = models.FloatField()
   latitude     = models.FloatField()
   length     = models.FloatField()
   ascent       = models.FloatField()
   descent      = models.FloatField()
   high_altitude = models.FloatField(blank=True)
   low_altitude  = models.FloatField(blank=True)
   ratings      = models.FloatField(default=0)
   map_info = models.JSONField()
    
class Event(models.Model):
   initiator    = models.ForeignKey(User, default=None, on_delete=models.PROTECT, related_name="initiator")
   name         = models.CharField(max_length=200)
   description  = models.TextField(blank=True)
   time		    = models.DateTimeField(auto_now_add=True)
   trail	    = models.ForeignKey(Trail,on_delete=models.CASCADE)
   headcount    = models.IntegerField(default=0 )
#  Organizer =models.ForeignKey(Profile,on_delete=models.CASCADE)
   participants = models.ManyToManyField(User,related_name="participants")

class Photo(models.Model):
   picture 	= models.FileField(upload_to='')
   content_type 	= models.CharField(max_length=50, default='image/jpeg');
   Trail		=models.ForeignKey(Trail,on_delete=models.CASCADE)
   Event		=models.ForeignKey(Event,on_delete=models.CASCADE)


class CheckIn(models.Model):
   trail 		= models.ForeignKey(Trail,on_delete=models.CASCADE)
   User		=models.ForeignKey(Profile,on_delete=models.CASCADE)
   Time		=models.DateTimeField(auto_now_add=True)

class Review(models.Model):
   poster 	= models.ForeignKey(Profile,on_delete=models.CASCADE)
   trail 		= models.ForeignKey(Trail,on_delete=models.CASCADE)
   time 		= models.DateTimeField(auto_now_add=True)
   rating 	= models.IntegerField()
   Review_text	=models.TextField(blank=True)

class Follow_UnFollow(models.Model):
   time 		= models.DateTimeField(auto_now_add=True)
   user 		= models.ForeignKey(User,on_delete=models.CASCADE, related_name="this_user")
   following 	= models.ForeignKey(User,on_delete=models.CASCADE, related_name="following")


@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


