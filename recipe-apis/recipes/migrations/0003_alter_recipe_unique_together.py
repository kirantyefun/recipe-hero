# Generated by Django 4.2 on 2023-04-06 14:31

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('recipes', '0002_recipe_process'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='recipe',
            unique_together={('slug', 'chef')},
        ),
    ]