from django.db.utils import IntegrityError

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Recipe, Ingredient, RecipeReview
from .serializers import RecipeSerializer, RecipeListSerializer, IngredientSerializer, ReviewListSerializer, \
    ReviewSerializer
from .utils.queryset_helpers import filter_qs_helper


class RecipeViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Recipe.objects.all()
        if self.action == 'list':
            fields = (
                ('search', 'name__icontains'),
                ('created_after', 'created__gte'),
                ('created_before', 'created__lte')
            )
            return filter_qs_helper(self.request, queryset, fields)
        return Recipe.objects.prefetch_related('ingredients')

    def get_serializer_class(self):
        if self.action == 'list':
            return RecipeListSerializer
        return RecipeSerializer

    def create(self, request, *args, **kwargs):
        ingredients = request.data.pop('ingredients', [])
        recipe_serializer = self.get_serializer(data=request.data)
        recipe_serializer.is_valid(raise_exception=True)
        recipe = recipe_serializer.save(ingredients=ingredients, chef=request.user)
        return Response(self.get_serializer(instance=recipe).data)

    def update(self, request, *args, **kwargs):
        ingredients = request.data.pop('ingredients', [])
        recipe = self.get_object()
        print(recipe)
        recipe_serializer = self.get_serializer(instance=recipe, data=request.data)
        recipe_serializer.is_valid(raise_exception=True)
        try:
            recipe = recipe_serializer.save(instance=recipe, ingredients=ingredients, chef=request.user)
        except IntegrityError as err:
            return Response({
                "error": err.__str__(),
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response(self.get_serializer(instance=recipe).data, status=status.HTTP_200_OK)

    @action(methods=["POST"], detail=True, url_path='reviews')
    def post_review(self, request, pk):
        recipe = self.get_object()
        serializer = ReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save(recipe=recipe, user=request.user)
            return Response({
                "message": "review posted"
            }, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({
                "error": "Same user not allowed to post reviews more than once for single recipe."
            }, status=status.HTTP_400_BAD_REQUEST)


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
