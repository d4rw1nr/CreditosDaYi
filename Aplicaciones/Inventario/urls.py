from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProveedoresViewSet, ProductosViewSet

router = DefaultRouter()
router.register(r'proveedores', ProveedoresViewSet)
router.register(r'productos', ProductosViewSet)

urlpatterns = [
    path('', include(router.urls)),
]