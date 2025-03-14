from django.urls import path
from .views import CreateUserView, UserView

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('user/', UserView.as_view(), name='user'),
]
