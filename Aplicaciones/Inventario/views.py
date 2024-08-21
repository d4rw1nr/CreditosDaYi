from django.shortcuts import render
from rest_framework import viewsets
from .models import Proveedores, Productos
from .serializers import ProveedoresSerializer, ProductosSerializer

# Create your views here.

class ProveedoresViewSet(viewsets.ModelViewSet):
    queryset = Proveedores.objects.all()
    serializer_class = ProveedoresSerializer

class ProductosViewSet(viewsets.ModelViewSet):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer