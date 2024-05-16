from rest_framework import serializers
from .models import Proveedores, Compras, Productos, ComprasDetalle

class ProveedoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedores
        fields = '__all__'

class ComprasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compras
        fields = '__all__'

class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'

class ComprasDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComprasDetalle
        fields = '__all__'