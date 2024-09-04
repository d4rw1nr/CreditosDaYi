from django.contrib import admin
from .models import Clientes, Ventas, VentasDetalle

admin.site.register(Clientes)
admin.site.register(Ventas)
admin.site.register(VentasDetalle)