from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.parsers import MultiPartParser, FormParser
from django.views.decorators.csrf import csrf_exempt

from django.http.response import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend

from hikerrank.models import Event, Trail, Profile, Follow_UnFollow, CheckIn, Review, Album
from django.contrib.auth.models import User
from .models import Trail
from .serializers import TrailSerializer

from hikerrank.serializers import SignupSerializer, EventSerializer, \
    ProfileSerializer, UserSerializer, FollowUnfollowSerializer, CheckinSerializer, \
    ReviewSerializer, AlbumSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class TrailViewSet(viewsets.ModelViewSet):
    queryset = Trail.objects.all()
    serializer_class = TrailSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    # parser_classes = [MultiPartParser,FormParser]

    def create(self, request, *args, **kwargs):
        data = {}
        print(request.data)
        picture = request.data['picture']
        bio = request.data['bio']
        user_id = int(request.data['user'])
        print('error point 1')
        user = User.objects.get(id=user_id)
        profile = Profile(user=user, bio=bio, picture=picture)
        profile.save()
        # data['picture'] = picture
        # data['bio'] = bio
        # data['user'] = user
        # serializer = self.get_serializer(data=data)
        # serializer.is_valid(raise_exception=False)
        # print(serializer.errors)
        # print(serializer.is_valid())
        # serializer.save()
        return Response({'message': 'success'}, status=200)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


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
            data['id'] = user.id
            profile = Profile(user=user)
            profile.save()
        else:
            data = serializer.errors
        return Response(data)


class TrailViewSet(viewsets.ModelViewSet):
    queryset = Trail.objects.all()
    serializer_class = TrailSerializer


class CheckinViewSet(viewsets.ModelViewSet):
    queryset = CheckIn.objects.all()
    serializer_class = CheckinSerializer


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def create(self, request, *args, **kwargs):
        data = {}
        print(request.data)
        picture = request.data['picture']
        caption = request.data['caption']
        user_id = int(request.data['user'])
        user = User.objects.get(id=user_id)
        album = Album(user=user, caption=caption, picture=picture)
        album.save()

        return Response({'message': 'success'}, status=200)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class AuthTokenView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
        })


class FollowUnfollowViewSet(viewsets.ModelViewSet):
    queryset = Follow_UnFollow.objects.all()
    serializer_class = FollowUnfollowSerializer

    def get(self, request, pk=None):
        if pk == None:
            data = Follow_UnFollow.objects.all()
        else:
            this_user = User.objects.get(id=pk)
            data = Follow_UnFollow.objects.filter(user=this_user)

        queryset = self.filter_queryset(data)
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
