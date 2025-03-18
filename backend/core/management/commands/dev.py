from django.core.management.base import BaseCommand
from django.core.management.commands.runserver import Command as RunServer
from dotenv import load_dotenv

class Command(BaseCommand):
    help = 'Run development server with test settings'
    
    def handle(self, *args, **kwargs):
        load_dotenv(os.path.join(os.path.dirname(__file__), '../../../../.env'))
        
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.test_settings')
        
        options['use_reloader'] = True
        options['serttings']  = 'config.settings.test_settings'
        
        self.stdout.write(self.style.SUCCESS('Starting dev server...'))
        RunServer().execute(**options)