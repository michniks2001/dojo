# Docs

## Create new env and download dependencies

```bash
python3 -m venv env && source env/bin/activate

pip install -r requirements.txt
```

## Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

## Initialize Swagger UI

```bash
python manage.py collectstatic
```

## Run Dev Server

```bash
python manage.py runserver
```

### View Swagger Docs -- localhost:8000/swagger/
