from dataclasses import field
from rest_framework import serializers
from .models import Opinion, Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'ingredients')

# TODO: Add serializers for Opinion, User, and Category.

class OpinionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opinion
        fields = ('product', 'date', 'description')
