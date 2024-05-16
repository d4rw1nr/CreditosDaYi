from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProveedoresViewSet, ComprasViewSet, ProductosViewSet, ComprasDetalleViewSet

router = DefaultRouter()
router.register(r'proveedores', ProveedoresViewSet)
router.register(r'compras', ComprasViewSet)
router.register(r'productos', ProductosViewSet)
router.register(r'compras', ComprasDetalleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]