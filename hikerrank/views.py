from django.shortcuts import render
from hikerrank.forms import TextForm
from hikerrank.models import Text


def getHome(request):
    textForm = TextForm()
    return render(request, 'hikerrank/hikerrank.html', {'form': textForm})


def create_text(request):
    text = Text()
    textForm = TextForm(request.POST, instance=text)
    textForm.save()
    return render(request, 'hikerrank/hikerrank.html', {'form': TextForm()})