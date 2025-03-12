from django.urls import path
from .views import WaitingListItemView

urlpatterns = [
    path('', WaitingListItemView.as_view(), name='waiting-list'),
]
