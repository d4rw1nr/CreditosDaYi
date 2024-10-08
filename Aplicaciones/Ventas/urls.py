from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientessViewSet, VentasViewSet, VentasDetalleViewSet

router = DefaultRouter()
router.register(r'clientes', ClientessViewSet)
router.register(r'ventas', VentasViewSet)
router.register(r'ventasdetalle', VentasDetalleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]