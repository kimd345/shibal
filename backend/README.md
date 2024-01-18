(To be updated -- initial draft for upgrade)
Steps taken to run backend:
1. Install packages in virtual environment inside backend:
    1. Inside `backend`, purge virtual env with `pipenv --rm`
    2. If `pipenv install` throws psycopg2 error, `pipenv install psycopg2-binary`
    3. Python 3.8.x required
    4. Run `pipenv install`
    5. Launch virtual env shell `pipenv shell`
    6. Check to see if dependencies installed with `pipenv run pip freeze`
2. Create a .env file based on the example with proper settings for your development environment
    1. in both backend and in root shibal(?)
3. Set up database:
    1. Make sure postgresql is installed with brew `brew update` -> `brew install postgresql`
    2. Launch PostgreSQL shell `psql postgres`
    3. CREATE USER shibal_backend_dev WITH PASSWORD 'password';
    4. CREATE DATABASE shibal_backend OWNER shibal_backend_dev;
    5. ALTER USER shibal_backend_dev CREATEDB;
4. Set up migration:
    1. (?) `pipenv install Flask-Migrate` in both backend and root shibal
    2. in `pipenv shell`, `export FLASK_APP=__init__.py`
    3. Initialize migration environment `flask db init`
    4. Generate initial migration `flask db migrate`
    5. Apply migration `flask db upgrade`
    6. Verify table creation `psql shibal_backend` -> `\dt`
5. Seed data:
    1. in root shibal `pipenv run seed` or `pipenv run python -m database.py`
6. Run backend app:
    1. `pipenv run flask run`