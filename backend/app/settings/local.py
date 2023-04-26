from .base import *
import dotenv


dotenv.load_dotenv('.env.local')

DEBUG = int(os.environ.get("DEBUG",default=1))

CORS_ORIGIN_WHITELIST = os.environ.get("DJANGO_CORS_ORIGIN_WHITELIST").split(" ")
CSRF_TRUSTED_ORIGINS = os.environ.get("DJANGO_CSRF_TRUSTED_ORIGINS").split(" ")
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")

# Dummy value for development
SECRET_KEY = os.environ.get("SECRET_KEY")

# set the configurations files
os.environ.get("DJANGO_SETTINGS_MODULE")

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases
DATABASES = {
        'default': {
            'ENGINE': os.environ.get("SQL_ENGINE"),
            "NAME": os.environ.get("SQL_DATABASE"),
            "USER": os.environ.get("SQL_USER"),
            "PASSWORD": os.environ.get("SQL_PASSWORD"),
            "HOST": os.environ.get("SQL_HOST"),
            "PORT": os.environ.get("SQL_PORT"),
            'OPTIONS': {
                'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
            }
        }
    }

if DEBUG:
    # Add django extensions
    INSTALLED_APPS += ['debug_toolbar']

    MIDDLEWARE = ['debug_toolbar.middleware.DebugToolbarMiddleware'] + MIDDLEWARE

    # Needed for django-debug-toolbar
    INTERNAL_IPS = [
        "127.0.0.1",
    ]


