from dataclasses import field
from rest_framework import serializers
from .models import Opinion, Product, User, Category


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'ingredients')

# TODO: Add serializers for Opinion, User, and Category.


class OpinionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opinion
        fields = ('id', 'product', 'date', 'description')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'is_admin', 'username', 'date_joined', 'password_hash')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'is_final')
