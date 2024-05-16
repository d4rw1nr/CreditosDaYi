from django.shortcuts import render
from rest_framework import viewsets
from .models import Cuentas, Transacciones, AsientosContables
from .serializers import CuentasSerializer, TransaccionesSerializer, AsientosContablesSerializer

# Create your views here.

class CuentasViewSet(viewsets.ModelViewSet):
    queryset = Cuentas.objects.all()
    serializer_class = CuentasSerializer

class TransaccionesViewSet(viewsets.ModelViewSet):
    queryset = Transacciones.objects.all()
    serializer_class = TransaccionesSerializer

class AsientosContablesViewSet(viewsets.ModelViewSet):
    queryset = AsientosContables.objects.all()
    serializer_class = AsientosContablesSerializer