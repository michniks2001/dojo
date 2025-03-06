from rest_framework.generics import CreateAPIView

from .models import WaitingListItem
from .serializers import WaitingListItemSerializer


class WaitingListItemCreateView(CreateAPIView):
    queryset = WaitingListItem.objects.all()
    serializer_class = WaitingListItemSerializer
