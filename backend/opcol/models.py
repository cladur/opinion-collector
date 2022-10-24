from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255, default="description placeholder")
    ingredients = models.CharField(max_length=255, default="ingredients placeholder")

    def __str__(self):
        return self.name


class Opinion(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    # TODO(Opinion): Add more fields - score, description, etc.

    def __str__(self):
        return self.product.name

# We could use the built-in User model, but it does too much work for us.
# So instead we create our own model that extends from the AbstractBaseUser.


class User(AbstractBaseUser):
    is_admin = models.BooleanField(default=False)
    # TODO(User): Add more fields - username, date_joined, etc.

    def __str__(self):
        return self.username


class Category(models.Model):
    name = models.CharField(max_length=100)
    # TODO(Category): Add more fields - description, etc.

    def __str__(self):
        return self.name
