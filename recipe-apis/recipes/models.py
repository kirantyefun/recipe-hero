from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import Avg

User = get_user_model()


class Ingredient(models.Model):
    # TODO: look internalization of name
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    about = models.TextField(help_text="Short description about the recipe")
    slug = models.SlugField()
    ingredients = models.ManyToManyField(Ingredient, related_name='recipes')
    chef = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    process = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['slug', 'chef']

    def __str__(self):
        return self.name

    @property
    def average_rating(self):
        return self.reviews.aggregate(avg_rating=Avg('rating'))['avg_rating']


class RecipeReview(models.Model):
    class Rating(models.IntegerChoices):
        ONE = 1, '1 star'
        TWO = 2, '2 stars'
        THREE = 3, '3 stars'
        FOUR = 4, '4 stars'
        FIVE = 5, '5 stars'

    rating = models.IntegerField(choices=Rating.choices)
    comment = models.TextField(blank=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    created = models.DateTimeField(auto_now_add=True)

    # TODO: include a inactive field to filter reviews given by user based on comment posted

    class Meta:
        unique_together = ('recipe', 'user')
        ordering = ['-id']

    def __str__(self):
        return f"{self.user.username}'s review for {self.recipe.name} ({self.rating} stars)"
