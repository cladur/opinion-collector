from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OpinionSerializer, ProductSerializer, CustomUserSerializer, CategorySerializer, CategorySerializerForUser, SuggestionSerializer, FeatureSerializer
from .models import Opinion, Product, CustomUser, Category, Suggestion, Feature
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models.query import EmptyQuerySet
from django.db.models.query import Q


class IsAdminUserOrReadOnly(permissions.IsAdminUser):
    def has_permission(self, request, view):
        is_admin = super().has_permission(request, view)
        return request.method in permissions.SAFE_METHODS or is_admin


class IsAuthenticatedButNotAdminOrReadOnly(permissions.IsAuthenticatedOrReadOnly):
    def has_permission(self, request, view):
        is_authenticated = super().has_permission(request, view)
        is_admin = permissions.IsAdminUser.has_permission(self, request, view)
        return request.method in permissions.SAFE_METHODS or (not is_admin and is_authenticated)


# Create your views here.


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        queryset = Product.objects.all()
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_active=True)
        category = self.request.query_params.get('category')
        if category is not None:
            queryset = queryset.filter(
                Q(category__id=category) | Q(category__parent__id=category) | Q(category__parent__parent__id=category) | Q(category__parent__parent__parent__id=category) | Q(category__parent__parent__parent__parent__id=category))
        name = self.request.query_params.get('name')
        if name is not None:
            queryset = queryset.filter(
                Q(name__contains=name) | Q(description__contains=name))
        return queryset


class FeatureView(viewsets.ModelViewSet):
    serializer_class = FeatureSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        queryset = Feature.objects.all()
        category = self.request.query_params.get('category')
        if category is not None:
            queryset = queryset.filter(
                Q(category__id=category) | Q(category__children__id=category) | Q(category__children__children__id=category) | Q(category__children__children__children__id=category) | Q(category__children__children__children__children__id=category))
        is_positive = self.request.query_params.get('is_positive')
        if is_positive is not None:
            queryset = queryset.filter(is_positive=is_positive)
        return queryset


class OpinionView(viewsets.ModelViewSet):
    serializer_class = OpinionSerializer
    permission_classes = [IsAuthenticatedButNotAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        queryset = Opinion.objects.all()
        product = self.request.query_params.get('product')
        if product is not None:
            queryset = queryset.filter(product__id=product)
        return queryset


class CustomUserView(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return CategorySerializer
        return CategorySerializerForUser

    def get_queryset(self):
        queryset = Category.objects.all()
        has_parent = self.request.query_params.get('has_parent')
        if has_parent is not None:
            if has_parent == 'True':
                queryset = queryset.filter(parent__isnull=False)
            if has_parent == 'False':
                queryset = queryset.filter(parent__isnull=True)
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_active=True)
        return queryset


class SuggestionView(viewsets.ModelViewSet):
    serializer_class = SuggestionSerializer
    queryset = Suggestion.objects.all()
    permission_classes = [IsAuthenticatedButNotAdminOrReadOnly]
