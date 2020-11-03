from django.shortcuts import render
from rest_framework import viewsets

from hikerrank.forms import TextForm
from hikerrank.models import Text
from hikerrank.serializers import TextSerializer


class TextViewSet(viewsets.ModelViewSet):
    queryset = Text.objects.all()
    serializer_class = TextSerializer


def getHome(request):
    textForm = TextForm()
    return render(request, 'hikerrank/hikerrank.html', {'form': textForm})


def create_text(request):
    text = Text()
    textForm = TextForm(request.POST, instance=text)
    textForm.save()
    return render(request, 'hikerrank/hikerrank.html', {'form': TextForm()})