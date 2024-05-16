from django.shortcuts import render
from rest_framework import viewsets
from .models import Proveedores, Compras, Productos, ComprasDetalle
from .serializers import ProveedoresSerializer, ComprasSerializer, ProductosSerializer, ComprasDetalleSerializer

# Create your views here.

class ProveedoresViewSet(viewsets.ModelViewSet):
    queryset = Proveedores.objects.all()
    serializer_class = ProveedoresSerializer

class ComprasViewSet(viewsets.ModelViewSet):
    queryset = Compras.objects.all()
    serializer_class = ComprasSerializer

class ProductosViewSet(viewsets.ModelViewSet):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer

class ComprasDetalleViewSet(viewsets.ModelViewSet):
    queryset = ComprasDetalle.objects.all()
    serializer_class = ComprasDetalleSerializer