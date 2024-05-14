from django.db import models
from Aplicaciones.Contabilidad.models import Transacciones
from simple_history.models import HistoricalRecords

# Create your models here.

class Proveedores(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre del proveedor")
    direccion = models.CharField(max_length=100, verbose_name="Dirección del proveedor")
    telefono = models.IntegerField(verbose_name="Telefono de contacto")
    email = models.EmailField(verbose_name="Correo electrónico del proveedor")
    nombre_contacto = models.CharField(max_length=100, verbose_name="Nombre del contacto")

    def __str__(self) -> str:
        return f"{self.nombre} Contacto:{self.telefono}"


class Compras(models.Model):
    transaccion = models.ForeignKey(Transacciones, related_name="Compras", on_delete=models.CASCADE)
    proveedor = models.ForeignKey(Proveedores, related_name="Compras", on_delete=models.CASCADE)
    fecha_compra = models.DateField()
    costo_total = models.PositiveIntegerField()
    pagada = models.BooleanField()

    def __str__(self) -> str:
        return f"Compra a {self.proveedor} por {self.costo_total}"


class Productos(models.Model):
    nombre = models.CharField(max_length=100)
    marca = models.CharField(max_length=100)
    dimensiones = models.CharField(max_length=10)
    detalle = models.CharField(max_length=100)
    precio_unitario = models.PositiveIntegerField()
    cantidad = models.PositiveIntegerField()
    history = HistoricalRecords(verbose_name="Historico de Productos")

    def __str__(self) -> str:
        return f"{self.nombre} {self.marca} / Precio:{self.precio_unitario} / Cantidad Actual:{self.cantidad}"


class ComprasDetalle(models.Model):
    compra = models.ForeignKey(Compras, related_name="DetalleCompra", on_delete=models.CASCADE)
    producto = models.ForeignKey(Productos, related_name="DetalleCompra", on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_compra = models.PositiveIntegerField()

    def __str__(self) -> str:
        return f"Se compraron {self.cantidad} unidad(es) de {self.producto.nombre}"