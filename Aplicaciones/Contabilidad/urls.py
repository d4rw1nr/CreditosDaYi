from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CuentasViewSet, TransaccionesViewSet, AsientosContablesViewSet

router = DefaultRouter()
router.register(r'cuentas', CuentasViewSet)
router.register(r'transacciones', TransaccionesViewSet)
router.register(r'asientoscontables', AsientosContablesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]