# Generated by Django 4.1.2 on 2022-11-08 21:48

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('opcol', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='opinion',
            name='rating',
            field=models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)]),
        ),
    ]
