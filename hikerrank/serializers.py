from rest_framework import serializers
from hikerrank.models import Event, Trail, Profile, Follow_UnFollow, CheckIn, Review, Album
from django.contrib.auth.models import User


class SignupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        # We check if password and confirm password equals in the front end before sending the data
        # to the back end rest framework API
        user.save()
        return user


class TrailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trail
        fields = '__all__'



class CheckinSerializer(serializers.ModelSerializer):
    class Meta:
        model=CheckIn
        fields='__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields='__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class FollowUnfollowSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Follow_UnFollow
        fields = '__all__'


class CheckinSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CheckIn
        fields = '__all__'


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'
