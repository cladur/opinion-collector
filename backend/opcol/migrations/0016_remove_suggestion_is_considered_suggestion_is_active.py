# Generated by Django 4.1.2 on 2022-12-19 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('opcol', '0015_category_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='suggestion',
            name='is_considered',
        ),
        migrations.AddField(
            model_name='suggestion',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
