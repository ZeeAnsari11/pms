from .base import *  # noqa

if DEBUG:
    # Add django extensions
    INSTALLED_APPS += ['debug_toolbar']

    MIDDLEWARE = ['debug_toolbar.middleware.DebugToolbarMiddleware'] + MIDDLEWARE

    # Needed for django-debug-toolbar
    INTERNAL_IPS = [
        "127.0.0.1",
    ]
