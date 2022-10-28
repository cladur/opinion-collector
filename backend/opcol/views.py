from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OpinionSerializer, ProductSerializer, UserSerializer, CategorySerializer
from .models import Opinion, Product, User, Category

# Create your views here.


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class OpinionView(viewsets.ModelViewSet):
    serializer_class = OpinionSerializer
    queryset = Opinion.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
