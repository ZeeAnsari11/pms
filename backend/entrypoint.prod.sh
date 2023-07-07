#!/bin/sh
until
python manage.py makemigrations --noinput
python manage.py migrate --noinput
do
    echo "Waiting for db to be ready..."
    sleep 2
done

python manage.py collectstatic --noinput

exec "$@"