from django.contrib import admin
from .models import Recipe, Ingredient


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}


admin.site.register(Ingredient, admin.ModelAdmin)