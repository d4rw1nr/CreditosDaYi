# Generated by Django 5.0.6 on 2024-08-21 02:36

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Ventas', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Caja',
        ),
        migrations.AddField(
            model_name='ventasdetalle',
            name='subtotal',
            field=models.PositiveIntegerField(null=False),
            preserve_default=False,
        ),
    ]
