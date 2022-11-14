from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser
from backend import settings
from datetime import date
from django.core.validators import MaxValueValidator, MinValueValidator
from simple_history.models import HistoricalRecords


# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(
        max_length=255, default="description placeholder")
    ingredients = models.CharField(
        max_length=255, default="ingredients placeholder")
    image = models.FileField(upload_to='media/', null=True)

    history = HistoricalRecords()


    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    pass

    def __str__(self):
        return self.username


class Opinion(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField(default = 0, validators=[MaxValueValidator(5),MinValueValidator(0)])
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(
        max_length=255, default="description placeholder")

    # TODO(Opinion): Add more fields - score, description, etc.

    def __str__(self):
        return self.product.name


class Suggestion(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(
        max_length=600, default="This suggestion is empty.")


    def __str__(self):
        return self.product.name


class Category(models.Model):
    name = models.CharField(max_length=100, default="Miscellaneous")
    # TODO(Category): Add more fields - description, etc.
    description = models.CharField(
        max_length=200, default="---")
    is_final = models.BooleanField(
        default=False)

    def __str__(self):
        return self.name
