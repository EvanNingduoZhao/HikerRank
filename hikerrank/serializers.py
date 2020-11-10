from rest_framework import serializers

from hikerrank.models import Event, Trail, Profile
from django.contrib.auth.models import User

class SignupSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ['username','email','password']
    
    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class TrailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trail
        fields = '__all__'


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    # def create(self, validated_data):
    #     print(validated_data)
    #     print("***************")
    #     picture = validated_data['picture']
    #     bio = validated_data['bio']
    #     # user_id = validated_data['user']
    #     profile = Profile(
    #         bio =bio,
    #         picture =picture,
    #         # user = this_user
    #     )
    #     profile.save()
    #     return profile


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']