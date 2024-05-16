from rest_framework import serializers
from .models import Creditos, Pagos

class CreditosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creditos
        fields = '__all__'

class PagosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagos
        fields = '__all__'