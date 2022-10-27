from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from backend import settings
from datetime import date


# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255, default="description placeholder")
    ingredients = models.CharField(max_length=255, default="ingredients placeholder")

    def __str__(self):
        return self.name


class Opinion(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    date = models.DateField(("data"), auto_now=False, auto_now_add=False)
    description = models.CharField(max_length=255, default="description placeholder")

    # TODO(Opinion): Add more fields - score, description, etc.

    def __str__(self):
        return self.product.name

# We could use the built-in User model, but it does too much work for us.
# So instead we create our own model that extends from the AbstractBaseUser.


class User(AbstractBaseUser):
    is_admin = models.BooleanField(default=False)
    user_name = models.CharField(max_length=60)
    date_joined = models.DateField(("data"), auto_now=False, auto_now_add=False)
    last_login = models.DateField(("data"), auto_now=False, auto_now_add=False)
    password_hash = models.CharField(max_length=60)  # W przyszlosci bedzie szyfrowane

    def __str__(self):
        return self.user_name


class Category(models.Model):
    name = models.CharField(max_length=100)
    # TODO(Category): Add more fields - description, etc.

    def __str__(self):
        return self.name
