from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OpinionSerializer, ProductSerializer, CustomUserSerializer, CategorySerializer, SuggestionSerializer
from .models import Opinion, Product, CustomUser, Category, Suggestion
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser


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
    queryset = Product.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAdminUserOrReadOnly]

    def get_searched_products_by_name(self, name):
        return Product.objects.filter(product__name=name)

    def get_searched_products_by_category(self, category):
        return Product.objects.filter(category__id=category)


class OpinionView(viewsets.ModelViewSet):
    serializer_class = OpinionSerializer
    queryset = Opinion.objects.all()
    permission_classes = [IsAuthenticatedButNotAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_opinions_of_product(self, product):
        return Opinion.objects.filter(product__id=product)


class CustomUserView(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]


class SuggestionView(viewsets.ModelViewSet):
    serializer_class = SuggestionSerializer
    queryset = Suggestion.objects.all()
    permission_classes = [IsAuthenticatedButNotAdminOrReadOnly]
