from rest_framework import serializers
from hikerrank.models import Event, Trail, Profile, Follow_UnFollow
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
        user.save()
        return user


class TrailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Trail
        fields='__all__'

class EventSerializer(serializers.HyperlinkedModelSerializer):
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
        fields = ['id','username','email']


class FollowUnfollowSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Follow_UnFollow
        fields = '__all__'

