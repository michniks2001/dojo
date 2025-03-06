from .models import WaitingListItem
from rest_framework import serializers


class WaitingListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitingListItem
        fields = '__all__'
