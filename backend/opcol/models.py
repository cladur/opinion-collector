from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser
from backend import settings
from datetime import date


# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(
        max_length=255, default="description placeholder")
    ingredients = models.CharField(
        max_length=255, default="ingredients placeholder")

    def __str__(self):
        return self.name


class Opinion(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    date = models.DateField(("data"), auto_now=False, auto_now_add=False)
    description = models.CharField(
        max_length=255, default="description placeholder")

    # TODO(Opinion): Add more fields - score, description, etc.

    def __str__(self):
        return self.product.name


class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateField(("data"), auto_now=False, auto_now_add=True)
    # Password will be hashed in the future
    password_hash = models.CharField(max_length=60)

    def __str__(self):
        return self.username


class Category(models.Model):
    name = models.CharField(max_length=100, default="Miscellaneous")
    # TODO(Category): Add more fields - description, etc.
    description = models.CharField(
        max_length=200, default="---")
    is_final = models.BooleanField(
        default=False)

    def __str__(self):
        return self.name
