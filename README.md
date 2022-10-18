# Opinion Collector

## Backend

### Setting up the environment

1. Install python
2. Install pip by running `py -m ensurepip --upgrade` command on Windows
3. Navigate to project directory
4. Run `pipenv shell` and `pipenv install django djangorestframework django-cors-headers`.

### Working with the environment

**Below commands assume you're inside `backend` directory.**

After changing something within database (models.py).

`python manage.py makemigrations opcol`

`python manage.py migrate opcol`

To run the server. (Access at [localhost:8000](localhost:8000))

`python manage.py runserver`

## Frontend

### Setting up the environment

1. [Install Node.js](https://nodejs.org/en/)
2. I think that's it? Not sure.

### Working with the environment

Run the application.

`npm start`

## VS Code Quality of Life

There's a `.vscode` folder in the repository with nice stuff setup such as auto-formatting.

In order to set it up:

### For Python

1. With opened file Python file hit F1 and run "Format Document".
2. A prompt should pop up asking you to install autopep8.

### For Javascript

1. Download "Prettier" extension inside Vscode.
2. With opened Javascript file hit F1 and run "Format Document".
3. When prompted - select "Prettier" code formatter.

If done correctly your code should be formatted automatically each time you save.
