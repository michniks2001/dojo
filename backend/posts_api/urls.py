from django.urls import path
from . import views

app_name = 'posts_api'

urlpatterns = [
    # Post URLs
    path('posts/', views.PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<slug:slug>/', views.PostRetrieveUpdateDestroyView.as_view(), name='post-detail'),
    
    # Comment URLs - nested under posts
    path('posts/<int:post_id>/comments/', views.CommentListCreateView.as_view(), name='comment-list-create'),
    path('posts/<int:post_id>/comments/<int:pk>/', views.CommentRetrieveUpdateDestroyView.as_view(), name='comment-detail'),
    
    # Like URLs - nested under posts
    path('posts/<int:post_id>/like/', views.LikeCreateView.as_view(), name='post-like'),
    path('posts/<int:post_id>/unlike/', views.LikeDestroyView.as_view(), name='post-unlike'),
]
