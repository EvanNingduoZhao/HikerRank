from rest_framework import serializers

from hikerrank.models import Text
from django.contrib.auth.models import User


class TextSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Text
        fields = ['input_text']

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