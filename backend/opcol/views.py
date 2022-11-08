from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OpinionSerializer, ProductSerializer, CustomUserSerializer, CategorySerializer
from .models import Opinion, Product, CustomUser, Category
from rest_framework import permissions


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
    permission_classes = [IsAdminUserOrReadOnly]


class OpinionView(viewsets.ModelViewSet):
    serializer_class = OpinionSerializer
    queryset = Opinion.objects.all()
    permission_classes = [IsAuthenticatedButNotAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_opinions_of_product(self,product):
        return Opinion.objects.filter(product__id=product)


class CustomUserView(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]
