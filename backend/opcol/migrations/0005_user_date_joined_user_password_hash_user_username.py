# Generated by Django 4.1.2 on 2022-10-27 17:46

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('opcol', '0004_alter_opinion_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='date_joined',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='data'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='password_hash',
            field=models.CharField(default='aaa', max_length=60),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='uzytkownik', max_length=60),
            preserve_default=False,
        ),
    ]