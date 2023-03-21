#!/bin/sh

if [ "$DATABASE" = "mysql" ]
then
    echo "Waiting for MYSQL Response..."

    while ! nc -z $MYSQL_DATABASE_HOST $MYSQL_DATABASE_PORT; do
      sleep 0.1
    done

    echo "MYSQL started"
fi


# python manage.py flush --no-input
python3 manage.py makemigrations
python3 manage.py migrate --noinput
python3 manage.py collectstatic --noinput
echo "from django.contrib.auth.models import User;
User.objects.filter(email='$DJANGO_ADMIN_EMAIL').delete();
User.objects.create_superuser('$DJANGO_ADMIN_USER', '$DJANGO_ADMIN_EMAIL', '$DJANGO_ADMIN_PASSWORD')" | python manage.py shell

exec "$@"
