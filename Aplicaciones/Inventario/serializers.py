from rest_framework import serializers
from .models import Proveedores, Productos

class ProveedoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedores
        fields = '__all__'

class ProductosSerializer(serializers.ModelSerializer):
    # Usa el serializador completo de Proveedores para devolver el objeto completo en la respuesta
    proveedor = ProveedoresSerializer(read_only=True)
    
    # Usa PrimaryKeyRelatedField para enviar solo el ID del proveedor al crear o editar
    proveedor_id = serializers.PrimaryKeyRelatedField(
        queryset=Proveedores.objects.all(), 
        source='proveedor',  # Esto indica que se asigna a la relación 'proveedor'
        write_only=True  # Solo se utiliza al escribir
    )

    class Meta:
        model = Productos
        fields = '__all__'