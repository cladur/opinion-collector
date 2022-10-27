from django.contrib import admin
from .models import Opinion, Product, User


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'ingredients')


class OpinionAdmin(admin.ModelAdmin):
    list_display = ('product', 'date', 'description')
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ('is_admin', 'username', 'date_joined', 'password_hash')


admin.site.register(Product, ProductAdmin)
admin.site.register(Opinion, OpinionAdmin)
admin.site.register(User, UserAdmin)
