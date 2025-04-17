from django.urls import path
from .views import EnvAwareRegisterView, EnvAwareLoginView, UserView

urlpatterns = [
    path('register/', EnvAwareRegisterView.as_view(), name='register'),
    path('login/', EnvAwareLoginView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user'),
]
