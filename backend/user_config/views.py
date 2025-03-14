from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer, UserCreateSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = (permissions.AllowAny,)


class UserView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user
