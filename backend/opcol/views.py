from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OpinionSerializer, ProductSerializer, CustomUserSerializer, CategorySerializer
from .models import Opinion, Product, CustomUser, Category

# Create your views here.


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class OpinionView(viewsets.ModelViewSet):
    serializer_class = OpinionSerializer
    queryset = Opinion.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CustomUserView(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
