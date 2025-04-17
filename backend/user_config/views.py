from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from django.conf import settings
from .models import User
from .serializers import UserSerializer, UserCreateSerializer
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import os
import jwt

# --- TESTING VIEWS (Django user model) ---
class TestRegisterView(generics.CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = (permissions.AllowAny,)

class TestLoginView(views.APIView):
    permission_classes = (permissions.AllowAny,)
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user:
            login(request, user)
            return Response({"detail": "Login successful"}, status=200)
        return Response({"detail": "Invalid credentials"}, status=400)

# --- PRODUCTION VIEWS (Supabase JWT) ---
SUPABASE_JWT_SECRET = os.environ.get("SUPABASE_JWT_SECRET", "your_supabase_jwt_secret")

class SupabaseAuthView(views.APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return Response({"detail": "Missing JWT"}, status=401)
        token = auth_header.split(" ")[1]
        try:
            decoded = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"])
            return Response({"detail": "JWT valid", "user": decoded}, status=200)
        except jwt.InvalidTokenError:
            return Response({"detail": "Invalid JWT"}, status=401)

# --- ENVIRONMENT-AWARE CBVs ---
from rest_framework.views import APIView

class EnvAwareRegisterView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, *args, **kwargs):
        if getattr(settings, "TESTING", False):
            # Inline logic from TestRegisterView
            serializer = UserCreateSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Inline logic from SupabaseAuthView
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return Response({"detail": "Missing JWT"}, status=401)
            token = auth_header.split(" ")[1]
            try:
                decoded = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"])
                return Response({"detail": "JWT valid", "user": decoded}, status=200)
            except jwt.InvalidTokenError:
                return Response({"detail": "Invalid JWT"}, status=401)

class EnvAwareLoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, *args, **kwargs):
        if getattr(settings, "TESTING", False):
            # Inline logic from TestLoginView
            email = request.data.get("email")
            password = request.data.get("password")
            user = authenticate(username=email, password=password)
            if user:
                login(request, user)
                return Response({"detail": "Login successful"}, status=200)
            return Response({"detail": "Invalid credentials"}, status=400)
        else:
            # Inline logic from SupabaseAuthView
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return Response({"detail": "Missing JWT"}, status=401)
            token = auth_header.split(" ")[1]
            try:
                decoded = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"])
                return Response({"detail": "JWT valid", "user": decoded}, status=200)
            except jwt.InvalidTokenError:
                return Response({"detail": "Invalid JWT"}, status=401)

# --- User Profile View (shared) ---
class UserView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def get_object(self):
        return self.request.user
