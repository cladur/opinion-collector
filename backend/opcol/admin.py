from django.contrib import admin
from .models import Opinion, Product, CustomUser, Category, Suggestion, Feature
from .forms import CustomUserCreationForm, CustomUserChangeForm


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'ingredients', 'image')


class OpinionAdmin(admin.ModelAdmin):
    list_display = ('id', 'rating', 'product', 'created_by',
                    'created_at', 'description')


class CustomUserAdmin(admin.ModelAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['id', 'username', 'date_joined', 'is_staff']


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'is_final')


class SuggestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'created_by', 'created_at', 'description')


class FeatureAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'name', 'is_positive')


admin.site.register(Product, ProductAdmin)
admin.site.register(Opinion, OpinionAdmin)
admin.site.register(Suggestion, SuggestionAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Feature, FeatureAdmin)
