from dataclasses import field
from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from .models import Opinion, Product, CustomUser, Category, Feature, Suggestion


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Product
        fields = ('id', 'is_active', 'name', 'description',
                  'category', 'ingredients', 'image')


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ('id', 'category', 'name', 'is_positive')


class OpinionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source='created_by.username', read_only=True)

    class Meta:
        model = Opinion
        read_only_fields = ('id', 'created_at',
                            'created_by', 'username')
        fields = ('id', 'rating', 'product', 'created_by', 'username',
                  'created_at', 'description', 'positive_features', 'negative_features')


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'is_staff', 'username', 'date_joined')


class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class CategorySerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True, required=False)

    class Meta:
        model = Category
        fields = ('id', 'is_active', 'name', 'description',
                  'is_final', 'parent', 'children')


class CategorySerializerForUser(CategorySerializer):
    def to_representation(self, instance):
        ret = super(CategorySerializer, self).to_representation(instance)
        # check the request is list view or detail view
        for child in ret['children']:
            if child.get('is_active') is False:
                ret['children'].remove(child)
        return ret


class SuggestionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source='created_by.username', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Suggestion
        read_only_fields = ('id', 'created_at', 'created_by')
        fields = ('id', 'is_active', 'username', 'product', 'product_name',
                  'created_by', 'created_at', 'description')
