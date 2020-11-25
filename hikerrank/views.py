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

from hikerrank.models import (
    Event, Trail, Profile, Follow_UnFollow, CheckIn, Review, Album,
    PendingRequest, ProcessedRequest, BroadcastMessage
)
from django.contrib.auth.models import User
from .models import Trail
from .serializers import TrailSerializer

from hikerrank.serializers import (
    SignupSerializer,EventSerializer, ProfileSerializer,UserSerializer,
    FollowUnfollowSerializer,CheckinSerializer,ReviewSerializer,AlbumSerializer,
    PendingRequestSerializer, ProcessedRequestSerializer, BroadcastMessageSerializer
)





class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        print(request.data['initiator'])
        name = request.data['name']
        description = request.data['description']
        event_time = request.data['event_time']
        headcount = int(request.data['headcount'])
        initiator_id = int(request.data['initiator'])
        initiator = User.objects.get(id=initiator_id)
        trail_id = int(request.data['trail_id'])
        trail = Trail.objects.get(id=trail_id)
        event = Event(name=name, initiator=initiator,description=description, \
            event_time=event_time,trail=trail,headcount=headcount)
        event.save()
        return Response({'message': 'success'}, status=200)
    
    def update(self, request, *args, **kwargs):
        print(request.data)
        # update in event api
        status = request.data['status']
        event_id = request.data['event_id']
        Event.objects.filter(id=event_id).update(status=status)

        # update in broadcast-message api
        audience = Event.objects.get(id=event_id).participants.all()
        message = "The event \"" + Event.objects.get(id=event_id).name +"\" has been cancelled by the initiator."
        messageType = "cancelevent"
        msg = BroadcastMessage(message=message,messageType=messageType)
        msg.save()
        msg.audience.set(audience)
        print(audience)
        return Response({'message': 'success'}, status=200)


class TrailViewSet(viewsets.ModelViewSet):
    queryset = Trail.objects.all()
    serializer_class = TrailSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


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
    def create(self, request, *args, **kwargs):
        print(request.data)
        trail_id = int(request.data['trail'])
        user_id = int(request.data['User'])
        trail=Trail.objects.get(id=trail_id)
        user_profile=Profile.objects.get(user_id=user_id)
        checkin=CheckIn(trail=trail,User=user_profile)
        checkin.save()
        return Response({'message': 'success'}, status=200)

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
    def create(self, request, *args, **kwargs):
        print(request.data)
        rating=request.data['rating']
        review_text=request.data['Review_text']
        trail_id = int(request.data['trail'])
        user_id = int(request.data['poster'])
        trail=Trail.objects.get(id=trail_id)
        poster_profile=Profile.objects.get(user_id=user_id)
        review=Review(rating=rating,Review_text=review_text,trail=trail,poster=poster_profile)
        review.save()
        return Response({'message': 'success'}, status=200)

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

    def create(self, request,*args, **kwargs):

        print(request.data)
        user_id = int(request.data['user_id'])
        following_id = int(request.data['following_id'])
        user = User.objects.get(id=user_id)
        following = User.objects.get(id=following_id) 
        new_follow = Follow_UnFollow(user=user,following=following)
        new_follow.save()
        return Response({'message': 'success'}, status=200)
       

class PendingRequestViewSet(viewsets.ModelViewSet):
    queryset = PendingRequest.objects.all()
    serializer_class = PendingRequestSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)
        user_id = int(request.data['user'])
        event_id = int(request.data['event'])
        text = request.data['text']
        user = User.objects.get(id=user_id)
        event = Event.objects.get(id=event_id)
        new_request = PendingRequest(user=user, event=event,text=text)
        new_request.save()
        return Response({'message': 'success'}, status=200)


class BroadcastMessageViewSet(viewsets.ModelViewSet):
    queryset = BroadcastMessage.objects.all()
    serializer_class = BroadcastMessageSerializer



class ProcessedRequestViewSet(viewsets.ModelViewSet):
    queryset = ProcessedRequest.objects.all()
    serializer_class = ProcessedRequestSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)
        user_id = int(request.data['user_id'])
        event_id = int(request.data['event_id'])
        status = request.data['status']
        user = User.objects.get(id=user_id)
        event = Event.objects.get(id=event_id)
        processed_request = ProcessedRequest(user=user,event=event,status=status)
        processed_request.save()

        if status == "Accepted":
            print("add to participant list")
            event.participants.add(user)
        return Response({'message': 'success'}, status=200)