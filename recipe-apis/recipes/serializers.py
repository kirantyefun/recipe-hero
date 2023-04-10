from rest_framework import viewsets, serializers
from .models import Recipe, Ingredient, RecipeReview


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = RecipeReview
        fields = ["rating", "comment", "user"]


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField(read_only=True)
    chef = serializers.StringRelatedField(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ["name", "slug", "process", "ingredients", "chef", "reviews", "about"]

    def get_ingredients(self, obj):
        return [ingredient.name for ingredient in obj.ingredients.all()]


class RecipeListSerializer(serializers.ModelSerializer):
    average_rating = serializers.FloatField(read_only=True)
    chef = serializers.StringRelatedField()

    class Meta:
        model = Recipe
        exclude = ["ingredients"]


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'


class ReviewListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeReview
        fields = ["rating", ]



