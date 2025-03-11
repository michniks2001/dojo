from django.db import models
from uuid import uuid4


class WaitingListItem(models.Model):
    INTERESTS = [
            ('events', 'Events'),
            ('gyms', 'Gym Finder'),
            ('forum', 'Community Forum'),
            ('news', 'Share News'),
            ('sparring', 'Find Sparring Partners')
    ]


    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    referral_code = models.UUIDField(default=uuid4, editable=False, unique=True)
    referred_by = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
    interests = models.JSONField(default=list)


    def __str__(self):
        return f'{self.email}'
