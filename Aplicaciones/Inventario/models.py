from django.db import models
from Aplicaciones.Contabilidad.models import Transacciones
from simple_history.models import HistoricalRecords

# Create your models here.

class Proveedores(models.Model):
    nombre_proveedor = models.CharField(max_length=100, verbose_name="Nombre del proveedor")
    nombre_contacto = models.CharField(max_length=100, verbose_name="Nombre del contacto")
    telefono = models.IntegerField(verbose_name="Telefono de contacto")
    direccion = models.CharField(max_length=100, verbose_name="Dirección del proveedor")
    email = models.EmailField(verbose_name="Correo electrónico del proveedor")

    def __str__(self) -> str:
        return f"{self.nombre_proveedor} Contacto:{self.telefono}"


class Productos(models.Model):
    nombre = models.CharField(max_length=100)
    marca = models.CharField(max_length=100)
    detalle = models.CharField(max_length=100)
    precio = models.PositiveIntegerField()
    cantidad = models.PositiveIntegerField()
    id_proveedor = models.ForeignKey(Proveedores, related_name="Producto", on_delete=models.CASCADE)
    history = HistoricalRecords(verbose_name="Historico de Productos")

    def __str__(self) -> str:
        return f"{self.nombre} {self.marca} / Precio:{self.precio} / Cantidad Actual:{self.cantidad}"