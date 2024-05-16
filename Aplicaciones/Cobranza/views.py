from django.shortcuts import render
from rest_framework import viewsets
from .models import Creditos, Pagos
from .serializers import CreditosSerializer, PagosSerializer

# Create your views here.

class CreditosViewSet(viewsets.ModelViewSet):
    queryset = Creditos.objects.all()
    serializer_class = CreditosSerializer


class PagosViewSet(viewsets.ModelViewSet):
    queryset = Pagos.objects.all()
    serializer_class = PagosSerializer