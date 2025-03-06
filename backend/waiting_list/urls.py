from django.urls import path
from .views import WaitingListItemCreateView

urlpatterns = [
    path('', WaitingListItemCreateView.as_view(), name='waiting-list'),
]
