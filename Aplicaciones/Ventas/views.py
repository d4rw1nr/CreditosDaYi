from django.shortcuts import render
from rest_framework import viewsets
from .models import Clientes, Ventas, VentasDetalle
from .serializers import ClientesSerializer, VentasSerializer, VentasDetalleSerializer

# Create your views here.

class ClientessViewSet(viewsets.ModelViewSet):
    queryset = Clientes.objects.all()
    serializer_class = ClientesSerializer

class VentasViewSet(viewsets.ModelViewSet):
    queryset = Ventas.objects.all()
    serializer_class = VentasSerializer

class VentasDetalleViewSet(viewsets.ModelViewSet):
    queryset = VentasDetalle.objects.all()
    serializer_class = VentasDetalleSerializer