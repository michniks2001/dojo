from .base import *
import os

DEBUG = False
ALLOWED_HOSTS = ['your-production-domain.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres.evbzccyglhzgcigffqfq',
        'HOST': 'aws-0-us-west-1.pooler.supabase.com',
        'PORT': '6543',
        'PASSWORD': os.environ.get('SUPABASE_PASS')
    }
}

# Security settings
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True
SECRET_KEY = os.environ['SECRET_KEY']  # Must be set in production
