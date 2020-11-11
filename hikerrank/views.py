from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView,ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt

from hikerrank.models import Text
from django.contrib.auth.models import User
from hikerrank.serializers import TextSerializer, SignupSerializer
from .models import Trail
from .serializers import TrailSerializer


class TextViewSet(viewsets.ModelViewSet):
    queryset = Text.objects.all()
    serializer_class = TextSerializer


# class SignupViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = SignupSerializer

@api_view(['POST', 'GET'])
@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        serializer = SignupSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = "successfully signed up"
            data['email'] = user.email
            data['username'] = user.username
            token = Token.objects.get(user=user).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)


class TrailViewSet(viewsets.ModelViewSet):
    queryset = Trail.objects.all()
    serializer_class = TrailSerializer
