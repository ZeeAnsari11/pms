from .base import *  # noqa


if not DEBUG:
    DATABASES = {
        "default": {
            "ENGINE": os.environ.get("MYSQL_ENGINE", "django.db.backends.sqlite3"),
            "NAME": os.environ.get("MYSQL_DATABASE", os.path.join(BASE_DIR, "db.sqlite3")),
            "USER": os.environ.get("MYSQL_ROOT_USER", "root"),
            "PASSWORD": os.environ.get("MYSQL_PASSWORD", "root"),
            "HOST": os.environ.get("MYSQL_DATABASE_HOST", "localhost"),
            "PORT": os.environ.get("MYSQL_DATABASE_PORT", "5432"),
        }
    }