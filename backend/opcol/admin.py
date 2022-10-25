from django.contrib import admin
from .models import Opinion, Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'ingredients')

class OpinionAdmin(admin.ModelAdmin):
    list_display = ('product','date','description')
# Register your models here.

admin.site.register(Product, ProductAdmin)
admin.site.register(Opinion, OpinionAdmin)
