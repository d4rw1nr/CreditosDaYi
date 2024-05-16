from rest_framework import serializers
from .models import Cuentas, Transacciones, AsientosContables


class CuentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuentas
        fields = '__all__'


class TransaccionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transacciones
        fields = '__all__'


class AsientosContablesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsientosContables
        fields = '__all__'