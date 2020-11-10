from django.shortcuts import render,redirect
from django.urls import reverse
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.parsers import MultiPartParser, FormParser
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse


from hikerrank.models import Event, Trail, Profile
from django.contrib.auth.models import User
from hikerrank.serializers import SignupSerializer,EventSerializer,TrailSerializer, ProfileSerializer,UserSerializer



def getHome(request):
    textForm = TextForm()
    return render(request, 'hikerrank/hikerrank.html', {'form': textForm})


def create_text(request):
    text = Text()
    textForm = TextForm(request.POST, instance=text)
    textForm.save()
    return render(request, 'hikerrank/hikerrank.html', {'form': TextForm()})


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
    
    def create(self, request,*args, **kwargs):
        data = {}
        print(request.data)
        picture = request.data['picture']
        bio = request.data['bio']
        user_id = int(request.data['user'])
        print('error point 1')
        user = User.objects.get(id=user_id)
        profile = Profile(user=user,bio=bio,picture=picture)
        profile.save()
        # data['picture'] = picture
        # data['bio'] = bio
        # data['user'] = user
        # serializer = self.get_serializer(data=data)
        # serializer.is_valid(raise_exception=False)
        # print(serializer.errors)
        # print(serializer.is_valid())
        # serializer.save()
        return Response({'message':'success'},status=200)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



@api_view(['POST','GET'])
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