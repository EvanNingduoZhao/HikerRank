from django.db import models
from django.contrib.auth.models import User

class Text(models.Model):
    input_text = models.CharField(max_length=100)

class Profile_Picture(models.Model):
   Picture	=models.FileField(default='default.jpg',upload_to='profile_pics',blank=True)
   Content_type	=models.CharField(max_length=50,default='image/jpeg');

class Profile(models.Model):
   User      = models.ForeignKey(User, default=None, on_delete=models.PROTECT)
   bio       = models.TextField(blank=True)
   picture      = models.FileField(blank=True,default="default-picture.png")


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

class Event(models.Model):
   initiator    = models.ForeignKey(User, default=None, on_delete=models.PROTECT, related_name="initiator")
   name         = models.CharField(max_length=200)
   description  = models.TextField(blank=True)
   time      = models.DateTimeField(auto_now_add=True)
   trail     = models.ForeignKey(Trail,on_delete=models.CASCADE)
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
   user 		= models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='user')
   following 	= models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='following')