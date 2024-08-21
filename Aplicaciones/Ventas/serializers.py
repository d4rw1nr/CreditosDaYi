from rest_framework import serializers
from .models import Clientes, Ventas, VentasDetalle

class ClientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes
        fields = '__all__'

class VentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields = '__all__'

class VentasDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentasDetalle
        fields = '__all__'