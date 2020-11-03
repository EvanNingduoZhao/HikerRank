from rest_framework import serializers

from hikerrank.models import Text


class TextSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Text
        fields = ['input_text']
