from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()


class Post(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    photo_attachment = models.ImageField(upload_to='post_images/', null=True, blank=True)
    video_attachment = models.FileField(upload_to='post_videos/', null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    slug = models.SlugField(unique=True, blank=True)

    likes = models.ManyToManyField(
        User,
        through='Like',
        through_fields=('post', 'user'),
        related_name='liked_posts',
        blank=True 
    )
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.content[:50])
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.content[:50]

    @property
    def total_likes(self):
        return self.likes.count()

    def user_has_liked(self, user):
        return self.likes.filter(id=user.id).exists()

    class Meta:
        ordering = ['-created_at']


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user} liked {self.post}'


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.content[:50]

    class Meta:
        ordering = ['-created_at']