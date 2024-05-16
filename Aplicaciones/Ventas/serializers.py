from rest_framework import serializers
from .models import Clientes, Ventas, VentasDetalle, Caja

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

class CajaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caja
        fields = '__all__'