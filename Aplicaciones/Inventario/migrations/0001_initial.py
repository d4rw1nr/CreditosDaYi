# Generated by Django 5.0.6 on 2024-05-14 03:43

import django.db.models.deletion
import simple_history.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    operations = [
        migrations.CreateModel(
            name='Productos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('marca', models.CharField(max_length=100)),
                ('dimensiones', models.CharField(max_length=10)),
                ('detalle', models.CharField(max_length=100)),
                ('precio_unitario', models.PositiveIntegerField()),
                ('cantidad', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Proveedores',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, verbose_name='Nombre del proveedor')),
                ('direccion', models.CharField(max_length=100, verbose_name='Dirección del proveedor')),
                ('telefono', models.IntegerField(verbose_name='Telefono de contacto')),
                ('email', models.EmailField(max_length=254, verbose_name='Correo electrónico del proveedor')),
                ('nombre_contacto', models.CharField(max_length=100, verbose_name='Nombre del contacto')),
            ],
        ),
        migrations.CreateModel(
            name='Compras',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_compra', models.DateField()),
                ('costo_total', models.PositiveIntegerField()),
                ('pagada', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='HistoricalProductos',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('marca', models.CharField(max_length=100)),
                ('dimensiones', models.CharField(max_length=10)),
                ('detalle', models.CharField(max_length=100)),
                ('precio_unitario', models.PositiveIntegerField()),
                ('cantidad', models.PositiveIntegerField()),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Historico de Productos',
                'verbose_name_plural': 'historical productoss',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='ComprasDetalle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.PositiveIntegerField()),
                ('precio_compra', models.PositiveIntegerField()),
                ('compra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='DetalleCompra', to='Inventario.compras')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='DetalleCompra', to='Inventario.productos')),
            ],
        ),
    ]
