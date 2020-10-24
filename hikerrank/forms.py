from django import forms
from hikerrank.models import Text


class TextForm(forms.ModelForm):
    class Meta:
        model = Text
        fields = {'input_text'}
        labels = {'input'}
