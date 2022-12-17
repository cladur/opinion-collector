from dataclasses import field
from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from .models import Opinion, Product, CustomUser, Category, Suggestion


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Product
        fields = ('id', 'name', 'description',
                  'category', 'ingredients', 'image')


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


class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class CategorySerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'description',
                  'is_final', 'parent', 'children')


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = ('id', 'product', 'created_by', 'created_at', 'description')
