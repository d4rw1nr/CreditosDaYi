from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CreditosViewSet, PagosViewSet

router = DefaultRouter()
router.register(r'creditos', CreditosViewSet)
router.register(r'transacciones', PagosViewSet)

urlpatterns = [
    path('', include(router.urls)),
]