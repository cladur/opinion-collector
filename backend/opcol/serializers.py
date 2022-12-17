from dataclasses import field
from rest_framework import serializers
from .models import Opinion, Product, CustomUser, Category, Suggestion


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'ingredients', 'image')


class CustomUserForOpinionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')


class OpinionSerializer(serializers.ModelSerializer):
    created_by = CustomUserForOpinionSerializer()

    class Meta:
        model = Opinion
        read_only_fields = ('id', 'created_at', 'created_by')
        fields = ('id', 'rating', 'product', 'created_by',
                  'created_at', 'description')


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'is_staff', 'username', 'date_joined')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'is_final', 'parent')


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = ('id', 'product', 'created_by', 'created_at', 'description')
