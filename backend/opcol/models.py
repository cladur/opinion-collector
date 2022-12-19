from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from simple_history.models import HistoricalRecords


# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, default="Miscellaneous")
    description = models.CharField(max_length=200, default="---")
    is_final = models.BooleanField(default=False)
    parent = models.ForeignKey(
        "self", related_name="children", on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, default=None, blank=True, null=True)
    name = models.CharField(max_length=100)
    description = models.CharField(
        max_length=255, default="description placeholder")
    ingredients = models.CharField(
        max_length=255, default="ingredients placeholder")
    image = models.ImageField(upload_to='media/', null=True)

    history = HistoricalRecords()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    def __str__(self):
        return self.username


class Feature(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    is_positive = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Opinion(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0, validators=[
                                 MaxValueValidator(5), MinValueValidator(0)])
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(
        max_length=255, default="This description is empty.", blank=True)
    positive_features = models.ManyToManyField(
        Feature, related_name="positive_features", blank=True)
    negative_features = models.ManyToManyField(
        Feature, related_name="negative_features", blank=True)

    def __str__(self):
        return self.product.name

    class Meta:
        unique_together = ('product', 'created_by')


class Suggestion(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(
        max_length=600, default="This suggestion is empty.")
    is_considered = models.BooleanField(default=False)

    def __str__(self):
        return self.product.name
