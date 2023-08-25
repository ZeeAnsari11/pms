from .base import *
import dotenv


dotenv.load_dotenv('.env.prod')


DEBUG = int(os.environ.get("DEBUG"))

# we whitelist localhost:3000 because that's where frontend will be served
SECRET_KEY = os.environ.get("SECRET_KEY")

# email config
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "localhost"
EMAIL_PORT = "1025"
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""
EMAIL_USE_TLS = False


# set the configurations files
os.environ.get("DJANGO_SETTINGS_MODULE")

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
if not DEBUG:
    DATABASES = {
        "default": {
            "ENGINE": os.environ.get("SQL_ENGINE"),
            "NAME": os.environ.get("SQL_DATABASE"),
            "TEST_NAME": os.environ.get("SQL_TEST_DATABASE"),
            "USER": os.environ.get("SQL_USER"),
            "PASSWORD": os.environ.get("SQL_PASSWORD"),
            "HOST": os.environ.get("SQL_HOST"),
            "PORT": os.environ.get("SQL_PORT"),
        }
    }

    CALLBACK_URL_SET_ON_GOOGLE = 'https://projex.phpstudios.com'
